import Script from "next/script";

/**
 * 광고/전환 추적 픽셀 중 "설치 확인이 소스 검사를 요구하지 않는" 것들.
 * - 당근 비즈니스 픽셀: karrot-pixel 로드 후 ViewPage
 * - 메타(페이스북) 픽셀: fbevents 자체 로드 후 PageView
 *
 * 네이버 애널리틱스(wcslog)는 네이버 광고의 스크립트 설치 확인이 초기 HTML
 * 소스에서 <script> 태그를 직접 찾기 때문에, next/script 로는 리터럴 태그가
 * 남지 않는다(App Router 의 beforeInteractive 는 __next_s 큐로 직렬화된다).
 * 그래서 네이버만 src/app/layout.tsx 의 <head> 에 원본 태그로 직접 넣는다.
 *
 * "신청완료(Lead)" 전환 이벤트는 InquiryForm 제출 완료 시점에서 발생시킨다.
 */
export default function TrackingPixels() {
  return (
    <>
      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1069738695729744');fbq('track','PageView');`}
      </Script>

      {/* Danggeun (Karrot) Business Pixel */}
      <Script id="karrot-pixel" strategy="afterInteractive">
        {`(function(){var s=document.createElement('script');s.src='https://karrot-pixel.business.daangn.com/karrot-pixel.js';s.onload=function(){if(window.karrotPixel){window.karrotPixel.init('1784013422761190001');window.karrotPixel.track('ViewPage');}};document.getElementsByTagName('head')[0].appendChild(s);})();`}
      </Script>
    </>
  );
}
