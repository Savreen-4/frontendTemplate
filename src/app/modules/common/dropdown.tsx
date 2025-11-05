import { useState, useEffect, useRef } from "react";
import { KTIcon } from "../../../_metronic/helpers";

const SharedDropdown = (props:any) => {
  const [dropdownToggle, setDropToggle] = useState(false);
  const dropdownRef:any = useRef(null); // Ref to track the dropdown

  const toggleDropdown = () => {
    setDropToggle((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropToggle(false); 
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="card-toolbar" ref={dropdownRef}>
      <button
        type="button"
        className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
        onClick={toggleDropdown}
      >
        <KTIcon iconName="category" className="fs-2" />
      </button>
      {dropdownToggle && (
        <div className="custom-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px">
          <div className="menu-item px-3">
            <div className="menu-content fs-6 text-dark fw-bold px-3 py-4">
              Quick Actions
            </div>
          </div>

          <div className="separator mb-3 opacity-75"></div>

          <div className="menu-item px-3">
            <a className="menu-link px-3" onClick={props.openModal} >
              {props.title}
            </a>
          </div>

          <div className="separator mt-3 opacity-75"></div>
        </div>
      )}
    </div>
  );
};

export default SharedDropdown;
