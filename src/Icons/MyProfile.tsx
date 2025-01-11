import React from "react";

function MyProfile() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <g clipPath="url(#clip0_2771_1153)">
        <path
          d="M16.5 21.3333C10.9999 21.3333 6.10864 23.7994 2.99463 27.6263C2.32441 28.4499 1.9893 28.8618 2.00026 29.4183C2.00873 29.8484 2.29952 30.3908 2.66389 30.6563C3.1355 31 3.78905 31 5.09614 31H27.9039C29.211 31 29.8645 31 30.3361 30.6563C30.7005 30.3908 30.9913 29.8484 30.9997 29.4183C31.0107 28.8618 30.6756 28.4499 30.0054 27.6263C26.8914 23.7994 22.0001 21.3333 16.5 21.3333Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 16.5C20.812 16.5 24.3076 13.2541 24.3076 9.25C24.3076 5.24594 20.812 2 16.5 2C12.188 2 8.69243 5.24594 8.69243 9.25C8.69243 13.2541 12.188 16.5 16.5 16.5Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2771_1153">
          <rect width="33" height="33" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default React.memo(MyProfile);
