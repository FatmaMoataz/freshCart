import React from 'react'
import app_store from '../../assets/images/app_store.png'
import google_play from '../../assets/images/google_play.png'

export default function Footer() {
  return (
    <footer className='bg-[#f2f2f2] p-6'>
      <div className="container">
<h2 className='text-3xl text-[#212529]'>Get The FreshCart App</h2>
<p className='text-[#6d676e] font-light my-2'>We will send you a link, open it on your phone to download the app.</p>
      <div className="flex flex-col gap-2 md:flex-row">
      <input type="email" id="email" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block grow p-2.5 dark:bg-main dark:border-main dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main" placeholder="Email .." required />
      <button className='bg-main px-3 py-2 text-white rounded-md'>Share App Link</button>
      </div>
      <div className='border border-[#6d676e] border-opacity-5 my-5'></div>
      <div className="flex flex-col justify-center items-center gap-2 md:flex-row md:justify-between">
<div className="payment flex justify-center items-center gap-3">
<p>Payment Partners</p>
<img alt="amazonpay-logo" class="PageLogo-image" src="https://amazon-pay.brightspotcdn.com/75/8c/05780a7c41eb91759c77310a6f85/amazonpay-logo-rgb-clr.svg" width={'50'}></img>
<img src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-bluebox-solid.svg" alt="American Express" width={'40'}></img>
<img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa" width={'30'}></img>
<img src="https://www.mastercard.com/content/dam/public/brandcenter/assets/images/logos/mclogo-for-footer.svg" alt="mastercard" width={'30'}></img>
</div>
<div className="delivery flex justify-center items-center gap-3">
<p>Get deliveries with FreshCart</p>
<img src={app_store} width={'90'} alt="app store" />
<img src={google_play} width={'100'} alt="google play" />
</div>
      </div>
      <div className='border border-[#6d676e] border-opacity-5 my-5'></div>
      </div>
    </footer>
  )
}
