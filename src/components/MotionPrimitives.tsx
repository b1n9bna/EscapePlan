import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';

const controlSpring = { type: 'spring', stiffness: 520, damping: 32, mass: 0.8 } as const;
const surfaceSpring = { type: 'spring', stiffness: 420, damping: 36, mass: 1 } as const;

export function SpringButton(props: HTMLMotionProps<'button'>) {
  const reduceMotion = useReducedMotion();
  return <motion.button {...props} whileTap={reduceMotion ? undefined : { scale: 0.97 }} transition={controlSpring} />;
}

function DisclosureBody({ id, children, labelledBy }: { id: string; children: ReactNode; labelledBy: string }) {
  const reduceMotion = useReducedMotion();
  const isPresent = useIsPresent();
  return (
    <motion.div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!isPresent}
      inert={!isPresent}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={reduceMotion ? { duration: 0 } : { ...surfaceSpring, opacity: { duration: 0.15 } }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedDisclosure({ open, ...props }: { open: boolean; id: string; labelledBy: string; children: ReactNode }) {
  return <AnimatePresence initial={false}>{open && <DisclosureBody key={props.id} {...props} />}</AnimatePresence>;
}

interface SpringOverlayProps {
  open: boolean;
  children: ReactNode;
  label: string;
  className: string;
  drawer?: boolean;
  onClose?: () => void;
}

function OverlaySurface({ children, label, className, drawer, onClose }: Omit<SpringOverlayProps, 'open'>) {
  const reduceMotion = useReducedMotion();
  const isPresent = useIsPresent();
  const panel = useRef<HTMLElement>(null);
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close.current?.();
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(panel.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]'
      ) ?? []).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        panel.current?.focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex bg-black/70 backdrop-blur-sm ${drawer ? 'justify-end' : 'items-center justify-center p-3 sm:p-4'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.1 : 0.18 }}
      onClick={(event) => { if (isPresent && event.target === event.currentTarget) onClose?.(); }}
    >
      <motion.section
        ref={panel}
        role="dialog"
        aria-label={label}
        aria-modal="true"
        tabIndex={-1}
        inert={!isPresent}
        className={`${className} outline-none`}
        initial={reduceMotion ? { opacity: 0 } : drawer ? { x: '100%' } : { opacity: 0, scale: 0.97 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : drawer ? { x: '100%' } : { opacity: 0, scale: 0.98 }}
        transition={reduceMotion ? { duration: 0.1 } : { ...surfaceSpring, opacity: { duration: 0.15 } }}
      >
        {children}
      </motion.section>
    </motion.div>
  );
}

export function SpringOverlay({ open, ...props }: SpringOverlayProps) {
  return createPortal(
    <AnimatePresence>{open && <OverlaySurface key={props.label} {...props} />}</AnimatePresence>,
    document.body
  );
}
