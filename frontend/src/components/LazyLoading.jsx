import React, { useEffect, useState, Suspense, lazy } from "react";
const Component = lazy(() => import('./ProfileDetails'))

const LazyLoading = () => {
    return (
        <div>
            <Suspense fallback={<div><h3>Loading...</h3></div>}>
                <Component />
            </Suspense>
        </div>
    )
}

export default LazyLoading
