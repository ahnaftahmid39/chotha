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
      viewBox='0 0 90 90'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='45' cy='37.5883' r='16.4706' fill='black' />
      <circle
        cx='45'
        cy='45'
        r='40.6765'
        stroke='black'
        style={{ fill: 'none' }}
      />
      <mask
        id='mask0_233_724'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='3'
        y='3'
        width='84'
        height='84'
      >
        <circle
          cx='45'
          cy='45'
          r='41.1765'
          fill='black'
          style={{ stroke: 'none' }}
        />
      </mask>
      <g mask='url(#mask0_233_724)'>
        <circle cx='45' cy='88' r='30' fill='black' />
      </g>
    </svg>
  );
};

export default ProfilePlaceholder;
