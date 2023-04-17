const ProfilePlaceholder = ({ width = 300, height = 300 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 300 300'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='150' cy='123' r='60' stroke='black' />
      <circle cx='150' cy='150' r='150' stroke='black' />
      <path d='M47 258C92.5 169.643 206.5 165.053 254 258' stroke='black' />
    </svg>
  );
};

export default ProfilePlaceholder;
