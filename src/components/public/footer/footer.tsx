import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { APP_NAME } from '@/constants/config';
import { footerStyles } from './footer.style';

const Footer: React.FC = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.grid}>
          <div className={footerStyles.logoContainer}>
            <Image src='/logo.svg' alt='NicAccount Logo' width={150} height={50} />
            <p className={footerStyles.logoText}>
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className={footerStyles.socialIcons}>{/* Add social media icons here */}</div>
          </div>
          <div className={footerStyles.sectionContainer}>
            <div className={footerStyles.sectionGrid}>
              <div>
                <h3 className={footerStyles.sectionTitle}>Solutions</h3>
                <ul className={footerStyles.linkList}>
                  <li>
                    <Link href='#' className={footerStyles.link}>
                      Marketing
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className={footerStyles.link}>
                      Analytics
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className={footerStyles.link}>
                      Commerce
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='mt-12 md:mt-0'>
                <h3 className={footerStyles.sectionTitle}>Support</h3>
                <ul className={footerStyles.linkList}>
                  <li>
                    <Link href='#' className={footerStyles.link}>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className={footerStyles.link}>
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className={footerStyles.link}>
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={footerStyles.border}>
          <p className={footerStyles.copyright}>&copy; 2024 {APP_NAME}, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
