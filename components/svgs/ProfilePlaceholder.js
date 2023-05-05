import styles from './ProfilePlaceholder.module.css';

const ProfilePlaceholder = ({
  hasSize = true,
  width = 300,
  height = 300,
  ...props
}) => {
  return (
    <svg
      className={styles['wrapper']}
      width={hasSize ? width : null}
      height={hasSize ? height : null}
      viewBox='0 0 300 300'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='150' cy='127.765' r='48.9118' stroke='black' />
      <circle cx='150' cy='150' r='125' stroke='black' />
      <path
        d='M65.1765 238.941C102.647 166.176 196.529 162.396 235.647 238.941'
        stroke='black'
      />
    </svg>
  );
};

export default ProfilePlaceholder;
