"use client";

export function BottomSheetDemo() {
  const openBottomSheet = () => {
    const dialog = document.getElementById('bottomSheet') as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const closeBottomSheet = () => {
    const dialog = document.getElementById('bottomSheet') as HTMLDialogElement;
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <div>
        <button 
          className="moon-button"
          onClick={openBottomSheet}
        >
          Open Bottom sheet
        </button>
        <dialog className="moon-bottom-sheet" id="bottomSheet">
          <div className="moon-bottom-sheet-box">
            <div className="w-full flex items-center justify-center h-full bg-primary text-primary overflow-y-auto min-h-[200px]">
              <div className="text-center">
                <p className="mb-4">Bottom sheet content</p>
                <button 
                  className="moon-button"
                  onClick={closeBottomSheet}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <form className="moon-backdrop" method="dialog">
            <button type="submit" aria-label="Close bottom sheet" />
          </form>
        </dialog>
      </div>
  );
}