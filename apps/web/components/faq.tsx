import React from 'react';


const FAQ: React.FC = () => {
  return (
    <>
      {/* ===== FAQ PART ====== */}
      <section className="faq mt-32 mb-24" id="faq">
        <h2 style={{ margin: '20px auto 80px', fontSize: 34, fontWeight: 500, textAlign: 'center', letterSpacing: 0, lineHeight: '1.5' }}>Frequently Asked Questions</h2>
        <div style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol viewBox="0 0 24 24" id="expand-more">
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </symbol>
            <symbol viewBox="0 0 24 24" id="close">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </symbol>
          </svg>
        </div>
        <details open>
        <summary>
            Does this product have what i need?
            <svg className="control-icon control-icon-expand" width={24} height={24} role="presentation">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#expand-more" />
            </svg>
            <svg className="control-icon control-icon-close" width={24} height={24} role="presentation">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#close" />
            </svg>
          </summary>
          <p style={{ marginTop: 20 }}>Totally. Totally does.</p>
        </details>
        <details>
          <summary>
            Can I use it all the time?
            <svg className="control-icon control-icon-expand" width={24} height={24} role="presentation">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#expand-more" />
            </svg>
            <svg className="control-icon control-icon-close" width={24} height={24} role="presentation">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#close" />
            </svg>
          </summary>
          <p style={{ marginTop: 20 }}>Of course you can, we won't stop you.</p>
        </details>
        <details>
          <summary>
            Are there any restrictions?
            <svg className="control-icon control-icon-expand" width={24} height={24} role="presentation">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#expand-more" />
            </svg>
            <svg className="control-icon control-icon-close" width={24} height={24} role="presentation">
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#close" />
            </svg>
          </summary>
          <p style={{ marginTop: 20 }}>Only your imagination my friend. Go forth!</p>
        </details>
      </section>
    </>
  );
};

export default FAQ;