import styles from './Layout.module.css';

const Layout = ({ children, className, wrapper = 'div', ...props }) => {
  const W = wrapper;
  const cls = className ? `${styles.layout} ${className}` : styles.layout;
  return (
    <W className={cls} role='layout' {...props}>
      {children}
    </W>
  );
};

export default Layout;
