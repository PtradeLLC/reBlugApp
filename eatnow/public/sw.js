if(!self.define){let e,i={};const a=(a,s)=>(a=new URL(a+".js",s).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(s,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let c={};const d=e=>a(e,n),o={module:{uri:n},exports:c,require:d};i[n]=Promise.all(s.map((e=>o[e]||d(e)))).then((e=>(r(...e),c)))}}define(["./workbox-860c9203"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1a9633bc7c3cf161f9b9c25a6cfb788b"},{url:"/_next/static/chunks/1566-76ef6a33790ee415.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/1667-e68d225f8205f9a2.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/186-24ab9714566621ad.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/2073-8650dc18d6cba4d8.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/2323-483b207880485bca.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/2338-381fe6e7bc9b317a.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/2465-de94626a11f0b132.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/3205-1b5234e2735c114e.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/3429-4f4b282f7d746e58.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/3f8f5523-78594145e5d262f0.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/429-8f9776e98b9510d3.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/4339-3291c936290735b9.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/458-1469308bba901d0f.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/4833-7d32563aaa47484c.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/5130-023e4b47c4f9a275.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/5214-8c92f5e99b3e3b0d.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/5782-60d809ed34bdf71c.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/5852-d5954a64df664b3a.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/6010-d8bd7e63521c69a7.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/618f8807-2557959f8a13be84.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/6369-33a600eebcfcc8df.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/6460-624197ad104f3158.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/6790.5164055177173fcd.js",revision:"5164055177173fcd"},{url:"/_next/static/chunks/7036-528afc830526ca16.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/7053-fae68adfc12cf3e9.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/7278-4e050a511dcac0a2.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/7498-3c556db836410b1d.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/7544-3bc92b99cb130616.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/76572126.0dedc5ab573354cd.js",revision:"0dedc5ab573354cd"},{url:"/_next/static/chunks/7672-37f7c3f9d81cff34.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/7a780305-2d9256c5a545d9c4.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/8124-bf86360bade1f24e.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/853-7028f86582690104.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/8701-f62ce65dec60e5cf.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/8989-4a3a87feb8f67f48.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/9e700f9e-edd7458fe4cfc5a6.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/_not-found/page-1d9c1ca7f5fd7551.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/account/page-733640d4fc6f34d2.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/auth/page-540e51d9d57c771a.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/beginner-blog/page-08116d844cb70132.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/blog-posts/%5Bid%5D/page-b9e637ffd0e31be9.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/blog-posts/page-23f40191595d4b01.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/bloggers/page-c105c0f88a08f0bd.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/brands/page-23e9144d304b92e4.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/categories/%5Bid%5D/page-6b3a0f32e761668b.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/chef-faq/page-d5095d74eb119615.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/contact/page-6c2dfc5907af9eb7.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/dashboard/page-88f3c6d11659002d.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/foodhini/page-2ccddd809e699c6d.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/integrate/page-2fa6d80a2594e009.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/layout-a708ff3272f68f19.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/login/page-43ccfa1406c1b691.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/monetize/page-1522443a2cce6ee0.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/orders/page-c1a015f52acc1174.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/page-3cfbb316cb0063e2.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/privacy-policy/page-36597d0bfa1017ea.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/profile/page-16c5f404603d3e38.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/restaurants/page-40810a3ac1b01808.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/verify/page-9469e599ff05ea75.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/app/write/page-8297471390bc87a6.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/bbfbfb6c-6848068fb33f1b0e.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/de2117cc-2f1dc65470b6e455.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/framework-a117d81bf1b91f9a.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/main-app-0827798e82520527.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/main-f5c9195d112b15fb.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/pages/_app-308fef0bf9b328f2.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/pages/_error-c91b5eabd7ac9382.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e20ef8c7335be405.js",revision:"wtT1FWAqJpEFm5QU5ttPA"},{url:"/_next/static/css/8b54669db085020c.css",revision:"8b54669db085020c"},{url:"/_next/static/css/9323452ad7d354f8.css",revision:"9323452ad7d354f8"},{url:"/_next/static/wtT1FWAqJpEFm5QU5ttPA/_buildManifest.js",revision:"16b2db850996c0cfb50eaa0969a2b7fa"},{url:"/_next/static/wtT1FWAqJpEFm5QU5ttPA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android/android-launchericon-144-144.png",revision:"ad60c6421dff3567df60fc695cb0f498"},{url:"/android/android-launchericon-192-192.png",revision:"691e97d645f98d0e5505703e364273ab"},{url:"/android/android-launchericon-48-48.png",revision:"96c8adfcb2a4e5c8ad4fac72144b1b28"},{url:"/android/android-launchericon-512-512.png",revision:"6aea6a9cb0a4e1f78fa539adfc6522e8"},{url:"/android/android-launchericon-72-72.png",revision:"c0636d1b31f135d22e6be65f5aa67305"},{url:"/android/android-launchericon-96-96.png",revision:"84f60478d33646ddfd2186955c1edac4"},{url:"/icons.json",revision:"5dbbc3fe59816e65ba28e355a58ea45c"},{url:"/images/21-07-2024/01_1721588722309_573121203.png",revision:"7c4bccc15a824a2782d637df4c3446d2"},{url:"/images/21-07-2024/01_1721588918031_131289053.png",revision:"7c4bccc15a824a2782d637df4c3446d2"},{url:"/images/21-07-2024/copy_1721597667433_68114052.png",revision:"691a15e1f6f616a83e127b563f8a9d22"},{url:"/images/21-07-2024/fbImage_no_bg_1721587794932_340365802.png",revision:"adea4273af516b4f3cf69e4dc1e6a55d"},{url:"/images/21-07-2024/fbImage_no_bg_1721613852919_964682887.png",revision:"adea4273af516b4f3cf69e4dc1e6a55d"},{url:"/images/21-07-2024/fbImage_nobg__1__1721587595584_556368502.png",revision:"0874a7d83cfb17f32d551527ddf46750"},{url:"/images/7venBlog.jpg",revision:"94f4e67646d89a33be161a129701c269"},{url:"/images/AIblogger2.jpg",revision:"4dd2ef7aa350b24e1eb93a11208f0efb"},{url:"/images/AIblogger3.jpg",revision:"95b10ff5d0816192b4c4bb201c7130b5"},{url:"/images/AIblogger4.jpg",revision:"2687bd47f21f3c0b43509723486c0444"},{url:"/images/AIblogger5.jpg",revision:"9b7de8c0b7bb115680674b785a785c44"},{url:"/images/Calendar.svg",revision:"f69bc5e5e42c3c0f6f6a457184daa382"},{url:"/images/Chick-fil-A-Logo.png",revision:"4ee6a82b57c8d64ce0103307e932f519"},{url:"/images/Creativity.gif",revision:"d89edc7ed1a5e229dca603c8af933a1f"},{url:"/images/Deep.jpeg",revision:"9e5e18094e60d9f4ee483b0a28ad3059"},{url:"/images/Dominoslogo.jpeg",revision:"b3576f0bfb24f99d60e7720cea8d0f6c"},{url:"/images/Growth.png",revision:"22ddb8536e80d320ae9c2bf149ff15ad"},{url:"/images/Mart.png",revision:"751af71d7872d98c95e670a064460867"},{url:"/images/Marttwainxyz.png",revision:"06a1d8072a45f00b10df1db624072ac3"},{url:"/images/Message.svg",revision:"47e978a09c48552e2807decaedef82aa"},{url:"/images/OtherVar.png",revision:"aae9c4163de3eafbfdf2c5f63c6f51be"},{url:"/images/aa.png",revision:"46510380f1a8ac6698db4e287c621831"},{url:"/images/about.png",revision:"c3f5ac17b351dc21e484f96e7377ac32"},{url:"/images/addme.png",revision:"f2606d6b067edf8f431823774dc83837"},{url:"/images/affiliate.png",revision:"f6cef669d60af67a410b047b178b7606"},{url:"/images/aimodel.jpeg",revision:"063b33c1221e29491946c7ebe1af94d1"},{url:"/images/air-table-logo.png",revision:"94c645e29fe349dfcf7b407042c885a2"},{url:"/images/air.png",revision:"777f8a8dde65325b2336e61a3c55b14a"},{url:"/images/automate.png",revision:"7b3bf4fe353eac5797ad5ac527b5237b"},{url:"/images/autopilot.png",revision:"f99d5849deb6e3d2487af7f86c957e17"},{url:"/images/barchart.png",revision:"74cb8210cc1f9a6267d7876371721018"},{url:"/images/bgone.png",revision:"be7debd044b9d77e4212c93208f10906"},{url:"/images/bgtwo.png",revision:"98c7f122d69025208f39e1e008623015"},{url:"/images/bking.jpeg",revision:"6656c3663037d4a748b3345ce63966f1"},{url:"/images/blkcreators.jpg",revision:"b12c25fcbb4698bfa3024443ac52d06a"},{url:"/images/blog.jpg",revision:"0d83bdee049cdb6bd8c78424f83a8f7c"},{url:"/images/blog.png",revision:"2a7e31e04664f009de518ac238590614"},{url:"/images/bloger1.jpg",revision:"b73aceb82ae8f1c8557025eb5d17244d"},{url:"/images/bloger2.jpg",revision:"fe55b0e0afeba4fb1d996baeae9195e3"},{url:"/images/bloger3.jpg",revision:"7582e46a0de6033441064a8df236973b"},{url:"/images/bloger4.jpg",revision:"d3ce782d0537f07bd64c90a152cc7e5b"},{url:"/images/blogger.png",revision:"dfb8274342622cc20f114a707ae86ff3"},{url:"/images/blogger1.jpg",revision:"93015404a79908bcc07f2b5b0d1da05e"},{url:"/images/bloggerin.jpg",revision:"4c75a1782816729ad2e79667623012e9"},{url:"/images/blogpost.png",revision:"ab2b04c56058bd7b15186d124c540818"},{url:"/images/box.png",revision:"668ef7b21af5a60511d7dc388f9eedc4"},{url:"/images/brand.png",revision:"aae9c4163de3eafbfdf2c5f63c6f51be"},{url:"/images/branding.jpg",revision:"2c790a93f684c475c3ae051a1e3423bf"},{url:"/images/broadreach.jpg",revision:"5c68b7b26f355f8cde940ad0bbfa904e"},{url:"/images/bulb2.png",revision:"2d30edb3be3cf10c2844e1599f795095"},{url:"/images/calendar.png",revision:"239739c0240708dcf46e8964c233e346"},{url:"/images/camgirl.png",revision:"b6ca5f274a3404866ea8d4363d49aad7"},{url:"/images/category.png",revision:"bab66d16c3c300e3b7acbfcd6e09e7f9"},{url:"/images/chart.png",revision:"92c485a22b84ec98571f86e385d9ad27"},{url:"/images/chat.png",revision:"6d76a0ca26d62273afa2563c8b6f1119"},{url:"/images/chef.jpg",revision:"a74384ed1ba955490dada75de5da7362"},{url:"/images/chick.jpeg",revision:"68a942087ac410be1499d2cef9eb0d56"},{url:"/images/coffeeprod.jpg",revision:"e2d514f3b7bca59dfd3dd5755360dead"},{url:"/images/contentsta-svg.png",revision:"537e7aa4adbaaf3db7a0f78401512b6e"},{url:"/images/convotool.png",revision:"c585bb1748ee4fad704fdf51a95ead2c"},{url:"/images/copy.png",revision:"691a15e1f6f616a83e127b563f8a9d22"},{url:"/images/creatememe-1.jpg",revision:"0526d9f52e86baf3f3a927fba3f82e98"},{url:"/images/creatememe.jpg",revision:"ded34592cec640b09c4ecb95fbaa9258"},{url:"/images/creatorplat.jpg",revision:"e7f53c2824613794a13e8ea5f885478d"},{url:"/images/creatorprofile.jpg",revision:"b41e88332b853f3d855bcde74f6248b6"},{url:"/images/creators.png",revision:"619a8ec55688c2dccf8768b1973feead"},{url:"/images/csv.png",revision:"804055a253062666038bd304443867e3"},{url:"/images/deepaiblogger.jpg",revision:"bd53f0f27f89d58df3f0b734d0476e11"},{url:"/images/design.png",revision:"94622ff8da53e68e11096e1c19338b17"},{url:"/images/dev.png",revision:"8831034b91537f07dac48a29ab9ce786"},{url:"/images/development.png",revision:"5694b132821a4f4795ebff5c8d04f59c"},{url:"/images/doc.png",revision:"c3ea5cb6649a99eab7b4f4b54eb05b33"},{url:"/images/download.gif",revision:"e37d53d8348ff7e573222bcb25cdcca3"},{url:"/images/dropbx.png",revision:"6a6a8631d22bb6bd063b020bd516d9f9"},{url:"/images/earn.png",revision:"8e391b7c11b10a65eac9ca764348c3e2"},{url:"/images/ecommer.jpg",revision:"d2e178548b2a222a509008c35364fbb4"},{url:"/images/ecommercez.jpg",revision:"d637ed9eeb35c5bb91046d4dddd926f4"},{url:"/images/eightBlog.jpg",revision:"93f54d1b35920d352b25a842db098294"},{url:"/images/email.png",revision:"01c8606ddad4d08f09674eeadcc39f00"},{url:"/images/emailToolPg.png",revision:"eab76f2736e826bb5c5513bf1b7b24b6"},{url:"/images/emailmar.jpg",revision:"3b549d47f7aa1694f727b42d4303cb6c"},{url:"/images/expertBlog.jpg",revision:"6822fe2af32901f2cce3fc0cf2f57ec2"},{url:"/images/facebook.png",revision:"cf69f5b36d7d02bd1329bb15b5a5da33"},{url:"/images/facebooklogo.png",revision:"e386cc8987be7bcdf699ab8bd9a41139"},{url:"/images/fashion.png",revision:"1bd0b7dadcb4d72c1667e43cb681fded"},{url:"/images/favicon.png",revision:"60bdc22a5b9bcd6f9416ffc84024a372"},{url:"/images/faviconfb.png",revision:"2a20785efcd908ac11b637b8667eb6dd"},{url:"/images/fiveBlog.jpg",revision:"1b60b96a98431ab5f5edf86d571bc86d"},{url:"/images/foodini.jpeg",revision:"2cfa9480a23895d06329198a40081898"},{url:"/images/foodini/Designer (3).jpeg",revision:"9fd2012c68e08d97583fd7c62b410500"},{url:"/images/foodini/appleimg.webp",revision:"7ddbae47bcbe4da379cd2b1f67b6be0b"},{url:"/images/foodini/applogo.png",revision:"4e8b3c9d9de3172535b6ed26a6489667"},{url:"/images/foodini/chef-hat.png",revision:"b99a7edc4d475386796cfd0d1e738f62"},{url:"/images/foodini/chefbo.png",revision:"457629ac58e4ada31e1a96dcb89d2228"},{url:"/images/foodini/chefs-hat.png",revision:"2a397d0f5d8a8844e34112c3307cd4cd"},{url:"/images/foodini/foodini0.jpeg",revision:"2cfa9480a23895d06329198a40081898"},{url:"/images/foodini/foodini1.jpeg",revision:"912c8ed2909e66e689835bd92eb1260e"},{url:"/images/foodini/foodini3.jpeg",revision:"9fd2012c68e08d97583fd7c62b410500"},{url:"/images/foodini/foodini4.jpeg",revision:"bff8e5452dcdca13c3e406f6789b2e19"},{url:"/images/foodini/foodini_2.jpeg",revision:"a08194a5b764debe7bb49376769b5170"},{url:"/images/foodini/gplay.png",revision:"ed41558fdf6fa4d35547b06f5cf28b7f"},{url:"/images/foodini/lastmicrosoftappstore.png",revision:"f80fa0e8673e020500d5b12e9db860d4"},{url:"/images/foodini/micsoft.png",revision:"8debba778eb7c071ffe6acc737f33ce1"},{url:"/images/foodini/new.png",revision:"50d7154472f401dca38bbf292c3edb95"},{url:"/images/foodini/stefstash.png",revision:"989ef535255207638515a22ef98453e4"},{url:"/images/fourBlog.jpg",revision:"5c9a05150ced3ca0a711bbb3ab16c414"},{url:"/images/gdriver.png",revision:"6b6b527a203858be025011951921c570"},{url:"/images/google-sheets.png",revision:"f244b651ac890f313b1439011ba3bffb"},{url:"/images/google.png",revision:"937c87b4439809d5b17b82728df09639"},{url:"/images/google_drive.png",revision:"66290304880543e1eec4333447006229"},{url:"/images/googlesheets.png",revision:"261616e83c4fbd4e6795590decacab12"},{url:"/images/grl-eating.jpeg",revision:"eb307a09b8ca2fce4a7f690f7bc9c219"},{url:"/images/gsheet.png",revision:"d49549d321d6a14dafc46442ecdf918e"},{url:"/images/guy.png",revision:"40b2d29d9165e22f837ca1b8492dc9f2"},{url:"/images/halalguys.webp",revision:"e4fcabe52b106c4b06bf9681a2870638"},{url:"/images/hamas.jpg",revision:"4d4e83d834a2452893260f73b8155546"},{url:"/images/heroimage.png",revision:"9e99a24ac43cb0af173d62cdefdb637b"},{url:"/images/heroimgetwo.png",revision:"66a058fd5b8adbac7e21331876eb8949"},{url:"/images/hotsauce.webp",revision:"de9e1465f5f7f49b6316329af9fc12ee"},{url:"/images/hubspot.png",revision:"501da2235ac0fa6b1f120c9901653801"},{url:"/images/ideabulb.png",revision:"092e1c721b3e5726effd19525e84c593"},{url:"/images/ideas.jpg",revision:"056ac85f739f375c6a7ec8e7ff644b40"},{url:"/images/image-file.png",revision:"4ebcc2a32bffd2cc7d03c1615dda5112"},{url:"/images/influencer-image.png",revision:"2886fb2e23a4d1441d42b13e72e0129e"},{url:"/images/influencer_1.jpg",revision:"90158cf91bdcb15ce39c8d8b51065184"},{url:"/images/info.png",revision:"3f9e6faa6828c15cad78451e2d9598e9"},{url:"/images/inspire.png",revision:"ed8e68e9d3e0c6f9e818a752d74616b7"},{url:"/images/instagram.png",revision:"4e6d3d88e0c99e08363f1c53d4f1beca"},{url:"/images/iphoneimage.png",revision:"47844f9d16946434423d78d6f739d74f"},{url:"/images/kfc.png",revision:"a84527ac99a83c019e586336c0372319"},{url:"/images/lastmicrosoftappstore.png",revision:"f80fa0e8673e020500d5b12e9db860d4"},{url:"/images/link.png",revision:"6d12447dfc7e707614eb29e49785d113"},{url:"/images/linkedIn.png",revision:"789a91dbeb87233f1c4ae13e396a64fb"},{url:"/images/livetoeat.jpg",revision:"b2c56508e4e00c2904c633ac3c31bde6"},{url:"/images/loginimage.jpg",revision:"48156c422394c2605cf67f970ec8bdfa"},{url:"/images/logo.png",revision:"4f6705acd9be3ddcdd41e0b90054b5f3"},{url:"/images/logo1.png",revision:"d21bc159560c61efb24df9f4bca4b6b1"},{url:"/images/logoCloud.png",revision:"2c14957fa3aa37dac47cea670c544dda"},{url:"/images/logoreBlug.png",revision:"f27eec0331b08808add1a97744435f28"},{url:"/images/loneWriter.png",revision:"12a2051c677e505b07b197a9a41cdc46"},{url:"/images/mail.jpg",revision:"7164632f76dfcc503f28fe372bd8f0b9"},{url:"/images/makesup.jpg",revision:"c83f3ae121c0ebd477f468cc42189997"},{url:"/images/mamamia.jpg",revision:"b0d39e26624a15f9a7d5cff8c92722f5"},{url:"/images/mamba.png",revision:"e8bcdd226a3d73deab50a2f843c3adb3"},{url:"/images/marketing.png",revision:"1244037bf6950d380b5ffcbe446babe5"},{url:"/images/mcdee.jpeg",revision:"56ed9994f0286509b3a859fb7a62b6f6"},{url:"/images/mcommerce.jpg",revision:"e7c38b1409d5e3990a60bd93ca5c1372"},{url:"/images/meaning.png",revision:"dfbcf3c6e7eb1f0604e5ca3492108b86"},{url:"/images/med.png",revision:"16396084047fb776fa15718c17dcd177"},{url:"/images/medium.webp",revision:"8b73fce1122541bf8e5d572a2da3bf7b"},{url:"/images/messaging.jpg",revision:"3980692abc9d4f747edec5de77d208ff"},{url:"/images/metrics.gif",revision:"2b385ab83291c1c249e1ac0c3941f369"},{url:"/images/micsoftsave.png",revision:"7be2d1497e181dc9bd6a3e7d05f4771f"},{url:"/images/mobileassaplatform.mp4",revision:"72dcf6737bf3b7d603264b4d12c084c7"},{url:"/images/myimage.png",revision:"48d388b5b31506993c2c5908ebb45ca0"},{url:"/images/natiob.png",revision:"c26b0ee70a3f676d40c9618c08459a38"},{url:"/images/nationbuild.png",revision:"512e18629ad25d207ee4d4376308c0c6"},{url:"/images/niche.png",revision:"9895f301298abfd42120828ca9333683"},{url:"/images/oneBlog.jpg",revision:"47629eeda7b44dfabf995a185d1b679d"},{url:"/images/onramp.png",revision:"d74c167c48ef739bc9070919babc21f0"},{url:"/images/palette.png",revision:"5f8cfd1bf0d6b81835fa87c620dea821"},{url:"/images/paypal.png",revision:"3003c8b8825c0194fb869eea117118a2"},{url:"/images/pdf.png",revision:"268db9a966c52b2cb47f311700e83e33"},{url:"/images/pete.jpg",revision:"53857115a7e5f93ffa8bd9d5680a0367"},{url:"/images/photo-upload.png",revision:"2c6fc9227b6cc251109547d8606bedd2"},{url:"/images/piechart.png",revision:"e926510d81482e3b6b967423443e0abb"},{url:"/images/pile.jpg",revision:"08edd78063464deb019b584cc5b91215"},{url:"/images/pile2.png",revision:"d60befb47d4485d444e2e1ef8a145532"},{url:"/images/pileo2.png",revision:"327ab628fb24ae1f7f5ee404e209ee41"},{url:"/images/plan.jpg",revision:"e380e6bdf4708b796beaca6d490e7481"},{url:"/images/platformblog.png",revision:"78ad08f152b8369d01251b40167515d1"},{url:"/images/poolgirl.png",revision:"be0406a434807cbb668af4239daf8fd6"},{url:"/images/prodone.png",revision:"2d1935d93aea37962ebac0f447f87c8e"},{url:"/images/prodtwo.png",revision:"2289b173953d44eee3e4c0619440f083"},{url:"/images/productreview.png",revision:"55f1f8bac140eb7d88510adf328d413f"},{url:"/images/project.png",revision:"53fce6b37831473a0f45a0e96b7569e9"},{url:"/images/purpleshirt.jpg",revision:"90158cf91bdcb15ce39c8d8b51065184"},{url:"/images/question.png",revision:"313ecfdb934db12d25d3adee3527b0fb"},{url:"/images/questionmark.png",revision:"3643d6c119a26f9d887db06dbac1387f"},{url:"/images/rabbit.png",revision:"edcb0a97a106b8146303adcd721df8ce"},{url:"/images/reBlugLogo.png",revision:"d36e667655842db0a619e3eed54b1533"},{url:"/images/reblogo.png",revision:"2f29d98bf8cf2ea53d4bb81d0986a459"},{url:"/images/reblugLogo2.png",revision:"d40b832a04810450cccf732fff268748"},{url:"/images/restaurants.jpg",revision:"ed6ac30895997c1aa798cbe97eacaaf9"},{url:"/images/salesforce.png",revision:"cbef5f7c926abfe60444458ef54cbf71"},{url:"/images/salesforcelogo.png",revision:"b35bfce445204934284e73a62264322d"},{url:"/images/scorpionTypist.png",revision:"d950ec7ab85a07bd3806240f0d933da8"},{url:"/images/sforce.png",revision:"19d7d5de20635c0c8fc648e8a59db02d"},{url:"/images/shop-two.png",revision:"35fa6b442ae8e077f6ccd2d3bd5a0248"},{url:"/images/shop.png",revision:"48168f2237accef0f85f22c7eb764061"},{url:"/images/shopifylogo.png",revision:"9aecc8d2c9a510b2e1f904a911957f8e"},{url:"/images/sixBlog.jpg",revision:"bf59ae9b9cf6c9906a2ca5134a1fc7fe"},{url:"/images/square.png",revision:"7215ee9ed6f30dedc0ccc047c517cc7e"},{url:"/images/staticmetrics.png",revision:"171247f65ea5cd64b1e9b42ff7017aac"},{url:"/images/store-one.png",revision:"1bebdfe4024720ea39ae40ea3aa7bbe9"},{url:"/images/store-two.png",revision:"69f4ff4e29de74c1ffe49583237745da"},{url:"/images/stripe.jpeg",revision:"d0e48c75e47630a1c3ae1e1539fcbcdf"},{url:"/images/submit.png",revision:"cef4b1b1ac3422defb479ff5e60b9281"},{url:"/images/superBlog.jpg",revision:"85bdc88ac148b4eda786583f8df4497f"},{url:"/images/team.png",revision:"0d26dd38984a94ca9541f8c3267366c2"},{url:"/images/threeBlog.jpg",revision:"5d651ee6bcb7be865722488c0fac2951"},{url:"/images/trekker.jpg",revision:"ca976a56b64a2aae64b0d5ca0a491b9d"},{url:"/images/trends.png",revision:"1c138b0939352264d5efd5b4bf0da621"},{url:"/images/tumblr.png",revision:"22ec5594aab87334833d10274977a7b9"},{url:"/images/tumblrLog.png",revision:"fe17dee3029733ea0916c8c913dfd5da"},{url:"/images/twilio.png",revision:"941164ecf18ab3fb2a02a137a9cfd7df"},{url:"/images/twitch.png",revision:"79c1408c54d06bf6e024d14fbec91765"},{url:"/images/twitter.png",revision:"2d39dbf9f8220ee68b6880607b89d6b0"},{url:"/images/twoBlog.jpg",revision:"9702763549d864117d7f1284a2b10dbc"},{url:"/images/txt.png",revision:"a6a7c1ab50489b9c001be0e61d6870d7"},{url:"/images/useravatar.png",revision:"b187428e9e9d448b802518a4f542f3fe"},{url:"/images/users.png",revision:"7ffac53c6fa81c430c278bc743f42648"},{url:"/images/userss.jpg",revision:"ff824806c45ba1ff641421f0d67d5612"},{url:"/images/video-file.png",revision:"3d771709378b2b772576198461fef081"},{url:"/images/vidgirl.png",revision:"33db842c780d6a27491e077020889a8e"},{url:"/images/webflow.png",revision:"87c289015f5d5fe6f32f765566deae45"},{url:"/images/wordpress.png",revision:"0bf6c5e99f86420e20cb482a794ea47a"},{url:"/images/workout.png",revision:"515b889477b8464f8494c0a9f09ac479"},{url:"/images/xlogo.png",revision:"1af850cb27cc180e3d5d53c9feebc6d2"},{url:"/images/xlsx.png",revision:"d188f706f02b0b9e796efdaeb77b6da5"},{url:"/images/y_combinator.png",revision:"728a062c8b8368d2cafc771bb004e77e"},{url:"/images/yellowbg.jpg",revision:"50b6b0a94f323d0d9990faea5c831b0d"},{url:"/images/youtube.png",revision:"3e499188e0e60a9c0c4005e30dad9139"},{url:"/images/zoho.png",revision:"773f3155e65fabd1fbf222c89d96790c"},{url:"/ios/100.png",revision:"b2532f13d023bb88518c4005256b0fd9"},{url:"/ios/1024.png",revision:"b5641989b11f9edbc88b69b7452cd58b"},{url:"/ios/114.png",revision:"0cb44462b0a19fa66ae6522f83f91a5a"},{url:"/ios/120.png",revision:"c14f9baea36c0f59e2a20488557e12e9"},{url:"/ios/128.png",revision:"4cf3758ecb4114ca4d885a5d2622fd2b"},{url:"/ios/144.png",revision:"ad60c6421dff3567df60fc695cb0f498"},{url:"/ios/152.png",revision:"ef33f4ff5f689f03c8075d86dbadb577"},{url:"/ios/16.png",revision:"453ff9c981666824b863e637c09099e1"},{url:"/ios/167.png",revision:"ca4d3a4a0fe12e04315dcd1158400f35"},{url:"/ios/180.png",revision:"98946daaaa767ff659ff2150d2376f53"},{url:"/ios/192.png",revision:"691e97d645f98d0e5505703e364273ab"},{url:"/ios/20.png",revision:"0c2785ad3b887e25a210e14519cf33e7"},{url:"/ios/256.png",revision:"9924c5e8434918f9fbf09c99de2a3c13"},{url:"/ios/29.png",revision:"12171b18182f5784057736f65495b37d"},{url:"/ios/32.png",revision:"023c005bbe5ba91e7ece1f22e860f1ec"},{url:"/ios/40.png",revision:"3c6df5fe675fcae3728ecbc9d25960a2"},{url:"/ios/50.png",revision:"5a296d35cece0dab1d6f08fc5c458dd6"},{url:"/ios/512.png",revision:"6aea6a9cb0a4e1f78fa539adfc6522e8"},{url:"/ios/57.png",revision:"c4097aa025206a35d4b58d69811cc59f"},{url:"/ios/58.png",revision:"84075245ccb30241bd1754761ce084cd"},{url:"/ios/60.png",revision:"8633c83b3d223f3f6d95a764d1d3a659"},{url:"/ios/64.png",revision:"b61caf04bac7861ba82e7a22319dc716"},{url:"/ios/72.png",revision:"c0636d1b31f135d22e6be65f5aa67305"},{url:"/ios/76.png",revision:"56a5cdc51f449e1873bf8d224c307018"},{url:"/ios/80.png",revision:"cbb847564bed0cb87c72c433c219a6ff"},{url:"/ios/87.png",revision:"af48c01a54250cefef5925f09f76ac94"},{url:"/manifest.json",revision:"7353ef38915f62c5b227c3f567f8d638"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/windows11/LargeTile.scale-100.png",revision:"17f42f58950e3ae39bbb0fbad53f83b0"},{url:"/windows11/LargeTile.scale-125.png",revision:"35f8dba2712136401bf8ff94120a7760"},{url:"/windows11/LargeTile.scale-150.png",revision:"97b4b66be2cee24f6abab4f14044fc7b"},{url:"/windows11/LargeTile.scale-200.png",revision:"0cb9d5d1a3d13662d5eb55ac49df018e"},{url:"/windows11/LargeTile.scale-400.png",revision:"af3c1676fe1f8541a7d23c301e68b7df"},{url:"/windows11/SmallTile.scale-100.png",revision:"559800cee8b5f6dc52fba95e4ad55d3c"},{url:"/windows11/SmallTile.scale-125.png",revision:"aea032ff6be9bea69e48d7b4b21e856b"},{url:"/windows11/SmallTile.scale-150.png",revision:"241df7b2b95bb9553d6534254774f95b"},{url:"/windows11/SmallTile.scale-200.png",revision:"c12eb3d87674c6d642b6c83c225ab110"},{url:"/windows11/SmallTile.scale-400.png",revision:"c5eeed7ee56b65112ccce8503863c6c7"},{url:"/windows11/SplashScreen.scale-100.png",revision:"3148b70a7e70d093c83bf798c10c238c"},{url:"/windows11/SplashScreen.scale-125.png",revision:"8350ef8691041ae2c1824bd6e940e3cc"},{url:"/windows11/SplashScreen.scale-150.png",revision:"dcb4da3f44002a65d8e97ef1558a90a8"},{url:"/windows11/SplashScreen.scale-200.png",revision:"b2904d8b9fd01fd0c9bbad2aa5504a92"},{url:"/windows11/SplashScreen.scale-400.png",revision:"23c079f63b0712b3453dbbc211e60486"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"b34ecfc2f02587168ade6d87dad4f482"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"73dce9a2caab9398b0167276d92f8a21"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"b0dfa461d1c3002bb872206e59f0b83f"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"24d16d0451af2e29eaf58981f3aeadcc"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"734f18f4a84a83f153f9983598680673"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"3dd617622853efdd1fab89a95d34d63a"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"e5e7aa1e4abef79127b1294bb692a9a2"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"a05dfb22f106d66ce6ebbe0febd16338"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"29590be5009ded6369b3161a26930fad"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"66ed2d0d6947135dbe309961a86c17b4"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"495a772147cbc2d3aed6aaab3b96607b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"75c85c4dbcd7220e0a232e6363ba5a4d"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"32fb3296fef4aba8b7e8e5a1c4d8814c"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"116e6200f17d12e18cd949fcbb91b1ec"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"a50b306ca6d4e8c71ad1e80311fc5b81"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"f6b634781a6624bab227d8e5965e3a30"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"69b213caefd92605d09ad7b94608b4dd"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"c2b4fd991040d1bef0c0a5c1d08ece13"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"1c9a1af12a91170438164bfe91ae873b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"ed572ee9be7879d4d3659b3ad3657236"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"3dd617622853efdd1fab89a95d34d63a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"e5e7aa1e4abef79127b1294bb692a9a2"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"a05dfb22f106d66ce6ebbe0febd16338"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"29590be5009ded6369b3161a26930fad"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"66ed2d0d6947135dbe309961a86c17b4"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"495a772147cbc2d3aed6aaab3b96607b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"75c85c4dbcd7220e0a232e6363ba5a4d"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"32fb3296fef4aba8b7e8e5a1c4d8814c"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"116e6200f17d12e18cd949fcbb91b1ec"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"a50b306ca6d4e8c71ad1e80311fc5b81"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"f6b634781a6624bab227d8e5965e3a30"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"69b213caefd92605d09ad7b94608b4dd"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"c2b4fd991040d1bef0c0a5c1d08ece13"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"1c9a1af12a91170438164bfe91ae873b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"ed572ee9be7879d4d3659b3ad3657236"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"116e6200f17d12e18cd949fcbb91b1ec"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"7bafd0708888482a93d86288bc6b517c"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"572cf03e9a9a63a41c82461adc1bb42d"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"89633692dc8f02e238a6668747dea164"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"b013bce4c410a33d9c4f73330146a2a7"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"3dd617622853efdd1fab89a95d34d63a"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"e5e7aa1e4abef79127b1294bb692a9a2"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"a05dfb22f106d66ce6ebbe0febd16338"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"29590be5009ded6369b3161a26930fad"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"66ed2d0d6947135dbe309961a86c17b4"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"495a772147cbc2d3aed6aaab3b96607b"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"75c85c4dbcd7220e0a232e6363ba5a4d"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"32fb3296fef4aba8b7e8e5a1c4d8814c"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"116e6200f17d12e18cd949fcbb91b1ec"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"a50b306ca6d4e8c71ad1e80311fc5b81"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"f6b634781a6624bab227d8e5965e3a30"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"69b213caefd92605d09ad7b94608b4dd"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"c2b4fd991040d1bef0c0a5c1d08ece13"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"1c9a1af12a91170438164bfe91ae873b"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"ed572ee9be7879d4d3659b3ad3657236"},{url:"/windows11/StoreLogo.scale-100.png",revision:"5a296d35cece0dab1d6f08fc5c458dd6"},{url:"/windows11/StoreLogo.scale-125.png",revision:"a06dad476ac8b07ef3fba0f72201981e"},{url:"/windows11/StoreLogo.scale-150.png",revision:"d95b6b7c82643a6fe19c15220df22faa"},{url:"/windows11/StoreLogo.scale-200.png",revision:"b2532f13d023bb88518c4005256b0fd9"},{url:"/windows11/StoreLogo.scale-400.png",revision:"7e68c9faeec825ba8bdd9cded86f77f2"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"94defbef99388e339b0c33a072f5c11b"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"43a5bc7a7d728eb22a41f8a6f4d9788d"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"480d9ea64ff490955c18e25132c32252"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"3148b70a7e70d093c83bf798c10c238c"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"b2904d8b9fd01fd0c9bbad2aa5504a92"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:a,state:s})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
