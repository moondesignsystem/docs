"use client";

export function DialogDemo() {
  const openDialog = () => {
    const dialog = document.getElementById('dialog') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const closeDialog = () => {
    const dialog = document.getElementById('dialog') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <div>
        <button className="moon-button" onClick={openDialog}>
          Open Dialog
        </button>
        <dialog className="moon-dialog" id="dialog">
          <div className="moon-dialog-box">
            <div className="w-full flex items-center justify-center h-space-160 bg-primary text-primary">
              <div className="text-center">
                <p className="mb-4">Dialog content</p>
                <button 
                  className="moon-button"
                  onClick={closeDialog}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <form method="dialog" className="moon-backdrop">
            <button type="submit" aria-label="Close dialog" />
          </form>
        </dialog>
      </div>
  );
}