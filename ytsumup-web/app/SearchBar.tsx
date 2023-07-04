export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="flex flex-wrap justify-center h-full">
      <div className="flex items-center w-[805px] h-[96px]">
        <input
          type="search"
          className="relative bg-[#111111] pl-5 mb-[12px] py-[16px] text-lg w-[1px] text-left border-[#282828] rounded-l-[40px] my-[28px] m-0 block min-w-0 flex-auto border border-solid bg-clip-padding font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
          placeholder="Enter Youtube URL"
          aria-label="Search"
          aria-describedby="button-addon2"
        />

        <span
          className="input-group-text bg-[#222222] mt-[38px] mb-[22px] py-[22px] flex items-center whitespace-nowrap rounded-r-[40px] px-[27.5px] text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

SearchBar.defaultProps = {
  className: "",
  style: {},
};

interface SearchBarProps {
  className: string;
  style: Object;
}