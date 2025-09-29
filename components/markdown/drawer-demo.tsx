"use client";

export function DrawerDemo() {
  const openDrawer = () => {
    const drawer = document.getElementById('drawer') as HTMLDialogElement;
    if (drawer) {
      drawer.showModal();
    }
  };

  const closeDrawer = () => {
    const drawer = document.getElementById('drawer') as HTMLDialogElement;
    if (drawer) {
      drawer.close();
    }
  };

  return (
   <div>
        <button className="moon-button" onClick={openDrawer}>
          Open Drawer
        </button>
        <dialog className="moon-drawer" id="drawer">
          <div className="moon-drawer-box">
            <div className="w-full flex items-center justify-center h-full bg-primary text-primary">
              <div className="text-center">
                <p className="mb-4">Drawer content</p>
                <button 
                  className="moon-button"
                  onClick={closeDrawer}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <form method="dialog" className="moon-backdrop">
            <button type="submit" aria-label="Close drawer" />
          </form>
        </dialog>
      </div>
  );
}