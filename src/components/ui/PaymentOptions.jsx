import React from 'react';
import { getImageSrc } from '../../utils/imageUrl';

const payOptions = [
  {
    brand: 'PayPal',
    title: 'Pay in 4 interest-free payments',
    href: '/',
    logo: 'https://1000logos.net/wp-content/uploads/2017/05/Color-Paypal-Logo.jpg'
  },
  {
    brand: 'Affirm',
    title: 'Monthly payments with Apply Pay',
    href: '/',
    logo: 'https://questfcu.com/wp-content/uploads/Apple_Pay_logo.png'
  },
  {
    brand: 'Afterpay',
    title: 'Pay in 4 interest-free payments',
    href: '/',
    logo: 'https://simplywall.st/cdn-cgi/image/format=auto,fit=cover,q=80,blur=0,metadata=none/https://images.simplywall.st/asset/logos/www.mastercard.com?size=150'
  }
];

const PaymentOptions = () => (
  <section className="container py-5">
    <h2 className="display-5 fw-bold text-center mb-2">Payment Options Available</h2>
    <p className="lead text-center text-muted mb-4">Shop now and pay over time with our flexible payment options.</p>
    <div className="row g-3 g-lg-4">
      {payOptions.map((opt, i) => (
        <div className="col-12 col-lg-4" key={i}>
          <div className="border rounded-4 p-4 h-100 bg-white shadow-sm">
            <div className="d-flex align-items-start gap-3">
              <img src={getImageSrc(opt.logo)} alt={opt.brand} style={{ width: 72, height: 'auto' }} loading="lazy" referrerPolicy="no-referrer" />
              <div>
                <div className="fw-bold h5 mb-2 m-0">{opt.title}</div>
                <a href={opt.href} className="text-decoration-underline">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PaymentOptions;
