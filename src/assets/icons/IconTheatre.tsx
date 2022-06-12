import React, { ReactElement } from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
const IconTheatre = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M0.467653936,4.16491707 C4.25744949,2.55978487 8.42280712,1.83240313 12.5136999,2.03241512 C12.6518376,2.0450058 12.9223575,2.06766903 13.010852,2.07954025 C13.0403501,2.25616954 13.0630134,2.35905341 13.0874753,2.50978187 L13.0874753,2.50978187 L13.9440014,7.25071358 C17.2326878,7.40180177 20.518856,8.10328268 23.5564482,9.38285579 L23.5564482,9.38285579 L23.5816296,9.39436728 C23.68919,9.44401054 23.8758918,9.53682186 24,9.61956063 C23.9820133,9.75518027 23.9593501,9.91418261 23.9327298,10.0602345 L23.9327298,10.0602345 L22.9028119,15.955552 C22.7035194,17.0843967 22.2757959,18.1632383 21.6736015,19.1409948 C20.4692128,21.0483034 18.4115355,22.177148 16.2286708,22.177148 C15.8520295,22.177148 15.4757479,22.1526861 15.0991067,22.0775018 C12.5136999,21.6256761 10.4808442,19.6687243 9.9541939,17.0606542 C9.93764614,17.0104114 9.92661431,16.9602485 9.91830046,16.910099 L9.8786498,16.6088286 C9.57755261,16.7091943 9.25127406,16.8099198 8.92535524,16.8602825 C8.54835422,16.9347474 8.17207267,16.9599288 7.79543138,16.9599288 C5.58738533,16.9599288 3.52970802,15.8310841 2.3501409,13.9237755 C1.72240542,12.9460191 1.32166197,11.8671774 1.12093051,10.7383327 L1.12093051,10.7383327 L0.0910126506,4.84265554 C0.0669104862,4.70667617 0.0176269561,4.50810311 -2.3625546e-13,4.3962259 C0.112236945,4.31924287 0.34102764,4.21563953 0.467653936,4.16491707 Z M14.1720727,8.52992696 C14.3469033,9.55804615 14.3469033,10.6113467 14.1465316,11.6405451 C14.1508484,11.6484592 14.1213502,11.7610559 14.0774627,11.9153817 C14.1292643,11.9495564 14.1817855,11.9790546 14.237904,12.0002789 L14.237904,12.0002789 C14.6102284,12.1402153 15.0372324,11.9693418 15.5113616,11.493414 L15.5113616,11.493414 L15.6120871,11.3923288 L16.3362312,12.1139548 L16.2365849,12.2146802 C15.2102644,13.246037 14.3332334,13.1679748 13.7684513,12.9111249 C13.7551412,12.9488969 13.7454284,12.9708407 13.7429102,12.969042 C13.1914383,14.2734368 12.2629654,15.3526382 11.0585767,16.0548385 C11.0841178,16.3062925 11.133761,16.5566672 11.1834043,16.8077614 C11.6104083,18.8647192 13.2418011,20.4450298 15.3250195,20.8213113 C17.4082379,21.1975929 19.4659152,20.2698394 20.5944001,18.4639758 C21.1210504,17.6369478 21.4735895,16.7077554 21.6484202,15.7299989 L21.6484202,15.7299989 L22.6042329,10.3365101 C19.9440014,9.28249007 17.0574975,8.68101516 14.1720727,8.52992696 Z M15.64324,15.7134871 C15.85944,15.7073717 16.0734816,15.7282362 16.281048,15.7750016 C16.4400504,15.8106153 16.593297,15.8613377 16.7411476,15.9264495 C17.4944301,16.2592033 18.10274,16.9675191 18.4811799,17.969018 L18.4811799,17.969018 L18.5063613,18.036648 L17.4268002,18.4194047 L17.4023383,18.3546527 C17.0828947,17.5099977 16.604089,16.99342 16.0206008,16.8617574 C15.4399904,16.731174 14.7622519,16.9887434 14.1129324,17.5859015 L14.1129324,17.5859015 L14.06221,17.6323072 L13.2689969,16.8265035 L13.3233167,16.7768602 C14.0560945,16.1023594 14.8575814,15.7350712 15.64324,15.7134871 Z M11.9363271,3.26270471 C8.34834223,3.16161951 4.7599976,3.78863552 1.42130823,5.11821163 L1.42130823,5.11821163 L2.37604173,10.5383208 C2.55087235,11.5160772 2.90233227,12.4197285 3.42934229,13.2722976 C4.53336531,15.0781613 6.61694346,16.0062745 8.69944241,15.6299929 L8.69944241,15.6299929 C10.7823011,15.2540711 12.4136939,13.6730411 12.8406979,11.5909018 C13.0410696,10.6127856 13.066251,9.63394999 12.8899814,8.65619353 L12.8899814,8.65619353 Z M18.2971041,11.9625788 L18.3406319,12.097479 C18.5474789,12.7367259 18.8521734,13.0824301 19.244643,13.1259579 C19.2450027,13.1263176 19.2457222,13.1263176 19.2464416,13.1263176 C19.7849631,13.183875 20.4328437,12.6115386 20.4400384,12.6057828 L20.4400384,12.6057828 L20.5047905,12.5471462 L21.3976497,12.9040021 L21.3458481,13.035305 C21.1861263,13.4457612 20.2799568,14.1821363 19.2820553,14.1529979 C18.6593561,14.1346515 17.822975,13.8184455 17.3679117,12.4126058 L17.3679117,12.4126058 L17.3240242,12.2777056 L18.2971041,11.9625788 Z M9.62046885,10.6985822 L10.671611,11.1155136 L10.6428323,11.1827838 C10.2449667,12.0954285 9.6593201,12.75554 8.94884585,13.0922508 C8.75422987,13.1847024 8.54954134,13.2523324 8.34089574,13.293342 C8.18117393,13.3246389 8.02073266,13.3404672 7.85921218,13.3404672 C7.03542179,13.3404672 6.19292524,12.9372056 5.44252053,12.1742102 L5.44252053,12.1742102 L5.39143834,12.1224085 L6.22530128,11.3363902 L6.27350561,11.3856737 C6.90663709,12.0292375 7.55307872,12.3091104 8.14088375,12.1932761 C8.7247317,12.078521 9.2409497,11.5698574 9.59312908,10.7615356 L9.59312908,10.7615356 L9.62046885,10.6985822 Z M4.31090593,6.71654487 C4.90122909,6.51437447 5.79408837,6.51581341 6.71644583,7.67091863 L6.71644583,7.67091863 L6.80458061,7.78171664 L6.00453265,8.41952466 L5.91603813,8.30872665 C5.49694826,7.78315557 5.09044907,7.56659583 4.70841178,7.66444342 L4.70841178,7.66444342 C4.1817615,7.80078253 3.77706097,8.56449738 3.77238444,8.57205179 L3.77238444,8.57205179 L3.73209425,8.64975429 L2.77160501,8.63032867 L2.77340368,8.48967275 C2.77808022,8.04863912 3.36624498,7.04066502 4.31090593,6.71654487 Z M9.84316611,5.93273209 L9.93822172,5.93808093 C10.9328857,6.01830157 11.752719,6.84928664 11.8667546,7.27521145 L11.8667546,7.27521145 L11.9038072,7.41119083 L10.9774927,7.66804076 L10.9184963,7.60256921 C10.91346,7.59645373 10.3317705,6.95648731 9.79037113,6.95468864 L9.79037113,6.95468864 C9.39286528,6.95468864 9.05291684,7.26549864 8.77664129,7.8781253 L8.77664129,7.8781253 L8.71836441,8.00726973 L7.78557467,7.58746039 L7.84385155,7.45831595 C8.45144193,6.11075315 9.31624198,5.88807793 9.93822172,5.93808093 Z" />
    </g>
  </svg>
);

export default IconTheatre;
