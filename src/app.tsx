import { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { IoMdCloseCircle } from "react-icons/io";
import { MdBrightness7, MdCleaningServices, MdDone } from "react-icons/md";
import './backend/wallpaperManager';

function App() {
  const [bright_preview, set_bright_preview] = useState<string | undefined>(undefined);
  const [dark_preview, set_dark_preview] = useState<string | undefined>(undefined);
  const [bright_path, set_bright_path] = useState<string | undefined>(undefined);
  const [dark_path, set_dark_path] = useState<string | undefined>(undefined);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 px-10">
      <div className='absolute top-0 left-0 w-full h-16 bg-stone-900 flex items-center justify-end'>

        <h1 className='w-fit mx-auto text-white text-sm'>Wallcrunch: Create Own Dynamic Wallpapers</h1>
        <div
          onClick={() => {
            window.close();
          }}
          className='cursor-pointer hover:opacity-90 h-4 w-4 rounded-full relative right-5 bg-red-300'
        >
          <IoMdCloseCircle />
        </div>
      </div>

      <h1 className='text-white mb-5'>Select your wallpapers</h1>

      <div className='grid grid-cols-2 grid-rows-1 rounded-2xl overflow-hidden w-full mx-10'>
        <div onClick={() => document.getElementById("brightinput").click()} className='min-h-[200px] w-full bg-stone-800 flex flex-col hover:bg-stone-700 cursor-pointer items-center justify-center contents-center'>
          {
            bright_preview ? (
              <img src={bright_preview} className='w-full h-auto ' alt="Bright Wallpaper Preview" />
            ) : (<div className='flex flex-col items-center justify-center'>
              <MdBrightness7 className='text-stone-500 text-4xl' />
              <h1 className='text-stone-400 mt-2 text-lg'>Bright Wallpaper</h1>
              <input
                id='brightinput'
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    set_bright_path(file.path);
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      set_bright_preview(ev.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </div>
            )
          }
        </div>
        <div onClick={() => document.getElementById("darkinput").click()} className='min-h-[200px] w-full bg-stone-800 hover:bg-stone-700 cursor-pointer flex flex-col  items-center justify-center contents-center'>
          {
            dark_preview ? (
              <img src={dark_preview} className='w-full h-auto ' alt="Bright Wallpaper Preview" />
            ) : (<div className='flex flex-col items-center justify-center'>
              <MdBrightness7 className='text-stone-500 text-4xl' />
              <h1 className='text-stone-400 mt-2 text-lg'>Dark Wallpaper</h1>
              <input
                id='darkinput'
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    set_dark_path(file.path);
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      set_dark_preview(ev.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </div>
            )
          }
        </div>
      </div>

      <div className='flex flex-row mx-auto w-fit mt-5'>
        <button
          onClick={() => {
            set_bright_preview(null);
            set_dark_preview(null);
          }}
          className='bg-stone-800 hover:bg-stone-700 text-white rounded-l-full px-6 py-2 flex items-center gap-2'
        >
          <MdCleaningServices className='text-red-300' />
          <h1 className='text-sm'>Clear</h1>
        </button>


        <button
          onClick={async () => {
            const result = await window.Electron.ipcRenderer.invoke('create-wallpaper', [
              { path: bright_path, name: bright_path.split("/").slice(-1)[0] }, { path: dark_path, name: dark_path.split("/").slice(-1)[0] }
            ])
            console.log(result.success, result.error);
            if (result.success) {
              alert(`Wallpaper created successfully! Check your GNOME Backgrounds`);
            } else {
              alert(`Error creating wallpaper: ${result.error}`);
            }
          }}

          className='bg-stone-800 hover:bg-stone-700 text-white rounded-r-full px-6 py-2 flex items-center gap-2'
        >
          <MdDone className='text-green-300' />
          <h1 className='text-sm'>Save</h1>
        </button>
        {/* Remove this duplicate preview if not needed, or keep only one preview image */}
      </div>

    </div>
  )
}

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();
