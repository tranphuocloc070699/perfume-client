import React from "react";

interface ICommonLoadDataSpinnerProps {
  text: string;
  loading: boolean;
}

const DataLoadingSpinner = ({
                              text,
                              loading
                            }: ICommonLoadDataSpinnerProps) => {
  return (
    <>
      {loading && (
        <div
          component-name="DataLoadingSpinner"
          className=" flex items-center flex-col"
        >
          <svg
            className="animate-spin w-12 h-12"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 50 50"
          >
            <path
              fill="currentColor"
              d="M25 18c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1"
            />
            <path
              fill="currentColor"
              d="M25 42c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1m4-23c-.2 0-.3 0-.5-.1c-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3c.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4M17 39.8c-.2 0-.3 0-.5-.1c-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3c.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4"
              opacity="0.3"
            />
            <path
              fill="currentColor"
              d="M21 19c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3s1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3c-.2.2-.3.2-.5.2"
              opacity="0.93"
            />
            <path
              fill="currentColor"
              d="M33 39.8c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3s1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3c-.2.1-.3.2-.5.2"
              opacity="0.3"
            />
            <path
              fill="currentColor"
              d="M17 26H9c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1"
              opacity="0.65"
            />
            <path
              fill="currentColor"
              d="M41 26h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1"
              opacity="0.3"
            />
            <path
              fill="currentColor"
              d="M18.1 21.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3c.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3c-.2.3-.5.4-.8.4"
              opacity="0.86"
            />
            <path
              fill="currentColor"
              d="M38.9 33.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3c.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3c-.2.3-.5.4-.8.4"
              opacity="0.3"
            />
            <path
              fill="currentColor"
              d="M11.1 33.9c-.3 0-.6-.2-.8-.5c-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3s.1 1-.3 1.3l-6.9 4c-.1.2-.3.2-.5.2"
              opacity="0.44"
            />
            <path
              fill="currentColor"
              d="M31.9 21.9c-.3 0-.6-.2-.8-.5c-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3s.1 1-.3 1.3l-6.9 4c-.2.2-.3.2-.5.2"
              opacity="0.3"
            />
          </svg>
          <span className="text-gray-700">{text}</span>
        </div>
      )}
    </>
  );
};

export default DataLoadingSpinner;
