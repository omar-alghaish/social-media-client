import React, { useEffect } from "react";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useDispatch } from "react-redux";
import { setCreatePostOpen } from "../../redux/features/creatPostModalSlice";
import { setCreateStoryOpen } from "../../redux/features/createStoryModalSlice";
const HalfCircleMenu = () => {
  const dispatch = useDispatch();
  const handlePost = () => {
    dispatch(setCreatePostOpen(true));
    document.querySelector(".radial").classList.remove("active");
  };
  const handleStory = () => {
    dispatch(setCreateStoryOpen(true));
    document.querySelector(".radial").classList.remove("active");
  };

  useEffect(() => {
    function openMenu(e) {
      e.preventDefault();

      const parent = e.target.closest(".radial");
      if (!parent) return;

      const menu = parent.querySelector(".radialMenu");
      if (menu.classList.contains("active")) {
        // Close the clicked dropdown
        parent.classList.remove("active");
        menu.classList.remove("active");
      } else {
        // Close the opened dropdowns
        closeMenus();
        // Add the open and active class (Opening the DropDown)
        parent.classList.add("active");
        menu.classList.add("active");
      }
    }

    // Listen to the document click
    document.addEventListener("click", (e) => {
      // Close the menu if click happens outside menu
      if (!e.target.closest(".radial")) {
        // Close the opened dropdowns
        closeMenus();
      }
    });

    function closeMenus() {
      // Remove the open and active class from other opened Menus (Closing the opened Menus)
      document.querySelectorAll(".radial").forEach((container) => {
        container.classList.remove("active");
      });

      document.querySelectorAll(".radialMenu").forEach((menu) => {
        menu.classList.remove("active");
      });
    }

    // Attach click event to trigger buttons
    document.querySelectorAll(".triggerButton").forEach((button) => {
      button.addEventListener("click", openMenu);
    });

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("click", closeMenus);
      document.querySelectorAll(".triggerButton").forEach((button) => {
        button.removeEventListener("click", openMenu);
      });
    };
  }, []);

  return (
    <div>
      <div className="radial">
        <a className="triggerButton" href="#">
          <AddIcon />
        </a>
        <ul className="radialMenu">
          <li id="fa-1" className="radialItem">
            <button onClick={handlePost}>
              <CreateIcon />
              <span>Post</span>
            </button>
          </li>
          <li id="fa-2" className="radialItem">
            <button>
              <SlideshowIcon />
              <span>Reel</span>
            </button>
          </li>
          <li id="fa-3" className="radialItem">
            <button onClick={handleStory}>
              <RotateLeftIcon />
              <span>Story</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HalfCircleMenu;
