import Head from 'next/head';

const ComponentTest = ({}) => {
  return (
    <>
      <Head>
        <title>Component Testing</title>
      </Head>
      <div
        className='main mt-1'
        style={{ minHeight: '80vh', display: 'grid', placeContent: 'center' }}
      >
        <svg
          width='230'
          height='200'
          viewBox='0 0 230 200'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16 4.00003H214C220.627 4.00003 226 9.37262 226 16V184C226 190.627 220.627 196 214 196H16C9.37259 196 4 190.627 4 184V16C4 9.37261 9.37258 4.00003 16 4.00003Z'
            fill='#EAF1FF'
            stroke='#B8CEF9'
            strokeWidth='8'
            className='bg fo'
          />
          <path
            d='M92.8201 61.8C92.8201 70.9679 85.388 78.4 76.2201 78.4C67.0521 78.4 59.6201 70.9679 59.6201 61.8C59.6201 52.6321 67.0521 45.2 76.2201 45.2C85.388 45.2 92.8201 52.6321 92.8201 61.8Z'
            stroke='#B8CEF9'
            strokeWidth='8'
            className='fo'
          />
          <path
            d='M4 153C4 153 30.88 101.147 46.1722 101.147C61.4643 101.147 84.9487 153 97.5101 153C110.071 153 149.394 66.4154 170.694 72.2855C191.994 78.1557 225 153 225 153'
            stroke='#B8CEF9'
            strokeWidth='8'
            className='fo'
          />
        </svg>

        <style jsx>
          {`
            .parent {
              border-radius: 10px;
              transition: transform 0.1s;
              cursor: pointer;
            }
            .parent:hover {
              transform: scale(1.1);
            }
            .bg {
              fill: var(--btn-bg-clr);
            }
            .fo {
              stroke: var(--btn-fo-clr);
            }
          `}
        </style>
      </div>
    </>
  );
};

export default ComponentTest;
