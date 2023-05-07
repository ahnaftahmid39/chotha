const SearchIcon = ({ width = 30, height = 30 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M20 20L31 31' stroke='#31549B' strokeWidth='2' />
      <ellipse
        cx='12.6424'
        cy='12.5'
        rx='11.6424'
        ry='11.5'
        stroke='#31549B'
        strokeWidth='2'
      />
    </svg>
  );
};

export default SearchIcon;
