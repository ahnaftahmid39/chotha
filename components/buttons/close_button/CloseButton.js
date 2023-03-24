const CloseButton = ({ onClick, className, ...props }) => {
  return (
    <span
      style={{ fontSize: '1.3rem' }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {` x `}
    </span>
  );
};
export default CloseButton;
