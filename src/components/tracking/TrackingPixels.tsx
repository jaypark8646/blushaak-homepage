import Script from "next/script";

/**
 * 광고/전환 추적 기본 픽셀 (전 페이지 공통 설치)
 * - 네이버 애널리틱스: wcslog 로드 후 inflow (공동인증키 s_3fd0bdb9538b)
 * - 당근 비즈니스 픽셀: karrot-pixel 로드 후 ViewPage
 * - 메타(페이스북) 픽셀: fbevents 자체 로드 후 PageView
 *
 * 외부 로더가 먼저 준비돼야 하는 네이버/당근은 self-loading(onload) 래퍼로
 * 실행 순서를 보장한다. "신청완료(Lead)" 전환 이벤트는 완료 지점 확정 후
 * 별도로 추가한다.
 */
export default function TrackingPixels() {
  return (
    <>
      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1069738695729744');fbq('track','PageView');`}
      </Script>

      {/* NAVER Analytics (wcslog / inflow) */}
      <Script id="naver-wcs" strategy="afterInteractive">
        {`(function(){var s=document.createElement('script');s.type='text/javascript';s.src='//wcs.naver.net/wcslog.js';s.onload=function(){if(!window.wcs_add)window.wcs_add={};window.wcs_add['wa']='s_3fd0bdb9538b';if(!window._nasa)window._nasa={};if(window.wcs){window.wcs.inflow();window.wcs_do();}};document.getElementsByTagName('head')[0].appendChild(s);})();`}
      </Script>

      {/* Danggeun (Karrot) Business Pixel */}
      <Script id="karrot-pixel" strategy="afterInteractive">
        {`(function(){var s=document.createElement('script');s.src='https://karrot-pixel.business.daangn.com/karrot-pixel.js';s.onload=function(){if(window.karrotPixel){window.karrotPixel.init('1784013422761190001');window.karrotPixel.track('ViewPage');}};document.getElementsByTagName('head')[0].appendChild(s);})();`}
      </Script>
    </>
  );
}
