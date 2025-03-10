import * as React from 'react';
import PrimeReact from '../api/Api';
import { useMountEffect, useUnmountEffect, useUpdateEffect } from '../hooks/Hooks';
import { DomHandler } from '../utils/Utils';

export const Ripple = React.memo(
    React.forwardRef(() => {
        const inkRef = React.useRef(null);
        const targetRef = React.useRef(null);
        const isTouchable = DomHandler.isTouchDevice();

        const getTarget = () => {
            return inkRef.current && inkRef.current.parentElement;
        };

        const bindEvents = () => {
            if (targetRef.current) {
                targetRef.current.addEventListener('mousedown', onMouseDown);
                isTouchable && targetRef.current.addEventListener('touchstart', onTouchStart);
            }
        };

        const unbindEvents = () => {
            if (targetRef.current) {
                targetRef.current.removeEventListener('mousedown', onMouseDown);
                isTouchable && targetRef.current.removeEventListener('touchstart', onTouchStart);
            }
        };

        const onTouchStart = (event) => {
            this.onMouseDown(event);
            event.preventDefault();
        };

        const onMouseDown = (event) => {
            if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
                return;
            }

            DomHandler.removeClass(inkRef.current, 'p-ink-active');

            if (!DomHandler.getHeight(inkRef.current) && !DomHandler.getWidth(inkRef.current)) {
                let d = Math.max(DomHandler.getOuterWidth(targetRef.current), DomHandler.getOuterHeight(targetRef.current));

                inkRef.current.style.height = d + 'px';
                inkRef.current.style.width = d + 'px';
            }

            const offset = DomHandler.getOffset(targetRef.current);
            const x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(inkRef.current) / 2;
            const y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(inkRef.current) / 2;

            inkRef.current.style.top = y + 'px';
            inkRef.current.style.left = x + 'px';
            DomHandler.addClass(inkRef.current, 'p-ink-active');
        };

        const onAnimationEnd = (event) => {
            DomHandler.removeClass(event.currentTarget, 'p-ink-active');
        };

        useMountEffect(() => {
            if (inkRef.current) {
                targetRef.current = getTarget();
                bindEvents();
            }
        });

        useUpdateEffect(() => {
            if (inkRef.current && !targetRef.current) {
                targetRef.current = getTarget();
                bindEvents();
            }
        });

        useUnmountEffect(() => {
            if (inkRef.current) {
                targetRef.current = null;
                unbindEvents();
            }
        });

        return PrimeReact.ripple ? <span role="presentation" ref={inkRef} className="p-ink" onAnimationEnd={onAnimationEnd}></span> : null;
    })
);

Ripple.displayName = 'Ripple';
Ripple.defaultProps = {
    __TYPE: 'Ripple'
};
