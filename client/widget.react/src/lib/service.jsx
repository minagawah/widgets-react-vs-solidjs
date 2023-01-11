import React from 'react';
import { createRoot } from 'react-dom/client';

import '@/i18n';

const NestedProviders = ({ components = [], children }) =>
  components.reduce(
    (acc, [Component, props = {}]) => (
      <Component props={props}>{acc}</Component>
    ),
    children
  );

/**
 * _create_React()
 */
const _create_React = (wrapper, _children, _providers = []) => {
  const children = React.Children.map(_children, child =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          dataset: wrapper.dataset,
          innerHTML: wrapper.innerHTML,
        })
      : child
  );

  createRoot(wrapper)?.render(
    <React.StrictMode>
      <NestedProviders components={_providers}>{children}</NestedProviders>
    </React.StrictMode>
  );
};

/**
 * run()
 */
export const run = (target, _children, _providers = []) => {
  const wrapper = !!target && document.querySelector(target);

  if (!target) throw new Error('No "target"');
  if (!wrapper) throw new Error(`No such id: ${target}`);
  if (!_children) throw new Error('No "children"');

  _create_React(wrapper, _children, _providers);
};

/**
 * run_all()
 */
export const run_all = (target, _children, _providers = []) => {
  if (!target) throw new Error('No "target"');
  if (!_children) throw new Error('No "children"');

  const wrappers = document.querySelectorAll(target);
  if (!wrappers) throw new Error(`No such class name: ${target}`);

  wrappers.forEach(wrap => {
    _create_React(wrap, _children, _providers);
  });
};
