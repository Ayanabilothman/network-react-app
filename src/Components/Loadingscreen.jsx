import React from 'react'

export function Loadingscreen() {
  return (
    <div className='v-100 d-flex align-items-center justify-content-center'>
        <div class="spinner-border text-success h2" role="status">
          <span class="sr-only">Loading...</span>
        </div>
    </div>
  )
}
