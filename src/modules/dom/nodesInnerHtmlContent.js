const todoItemTitleRightContent = `<button class="btn-edit-task">
<svg width="24" height="24" class="svg-edit">
<g fill="none" fill-rule="evenodd">
<path fill="currentColor" d="M9.5 19h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z"></path>
<path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 0 0-.43.9l-.22 2.02a.5.5 0 0 0 .55.55l2.02-.21a1.5 1.5 0 0 0 .9-.44L18.7 7.4a1.5 1.5 0 0 0 0-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0L4.42 16.02z"></path>
</g>
</svg>
 </button>
                <button class="btn-delete-task">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" class="svg-delete">
                    <g fill="none" fill-rule="evenodd">
                      <path d="M0 0h24v24H0z"></path>
                      <rect width="14" height="1" x="5" y="6" fill="currentColor" rx="0.5"></rect>
                      <path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path>
                      <path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path>
                    </g>
                  </svg>
                </button>`;

const todoItemBtnDateContent = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12" class="calendar_icon">
                  <path fill="currentColor" fill-rule="evenodd" d="M9.5 1h-7A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1ZM2 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7ZM8.75 8a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM3.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z" clip-rule="evenodd"></path>
                </svg>`;

export { todoItemTitleRightContent, todoItemBtnDateContent };
