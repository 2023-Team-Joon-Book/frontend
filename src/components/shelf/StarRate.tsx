interface StarRateProps {
  grade: number
}
// bookbox에서 사용
function StarRate({ grade }: StarRateProps) {
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last']

  return (
    <div className="flex items-center w-full content-center pt-2">
      {/* 숫자 부분 */}
      <span className="px-2.5 text-neutral-700">{grade.toFixed(1)}</span>
      {/* 별점 표시 */}
      {STAR_IDX_ARR.map((item, idx) => {
        return (
          <span className="inline-flex mr-0.5" key={`${item}_${idx}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 14 13"
              fill={idx < grade ? '#f6ce0b' : '#cacaca'}>
              <path
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
            </svg>
          </span>
        )
      })}
    </div>
  )
}

export default StarRate

// import styled from 'styled-components'
// import { useState, useEffect } from 'react'

// interface StarRateProps {
//   grade: number
// }

// function StarRate({ grade }: StarRateProps) {
//   const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last']
//   const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0])

//   // const calcStarRates = () => {
//   //   let tempStarRatesArr = [0, 0, 0, 0, 0]
//   //   let starVerScore = (grade * 70) / 5
//   //   let idx = 0
//   //   while (starVerScore > 14) {
//   //     tempStarRatesArr[idx] = 14
//   //     idx += 1
//   //     starVerScore -= 14
//   //   }
//   //   tempStarRatesArr[idx] = starVerScore
//   //   return tempStarRatesArr
//   // }

//   // useEffect(() => {
//   //   setRatesResArr(calcStarRates())
//   // }, [grade])

//   return (
//     <div className="flex items-center w-full content-center">
//       {/* 숫자 부분 */}
//       <span className="pr-3 text-neutral-700">{grade.toFixed(1)}</span>
//       {/* 소수점 한 자리 포함한 별점 표시 */}
//       {STAR_IDX_ARR.map((item, idx) => {
//         return (
//           <span className="inline-flex mr-1.5" key={`${item}_${idx}`}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="17"
//               height="17"
//               viewBox="0 0 14 13"
//               fill="#cacaca">
//               <clipPath id={`${item}StarClip`}>
//                 <rect width={`${ratesResArr[idx]}`} height="39" />
//               </clipPath>
//               <path
//                 id={`${item}Star`}
//                 d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
//                 transform="translate(-2 -2)"
//               />
//               <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill="#f6ce0b" />
//             </svg>
//           </span>
//         )
//       })}
//     </div>
//   )
// }

// export default StarRate
