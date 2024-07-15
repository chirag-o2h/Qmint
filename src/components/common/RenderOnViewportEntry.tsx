import useFirstViewportEntry from '@/hooks/useFirstViewportEntry'
import { Skeleton } from '@mui/material'
import React, { Suspense, useRef } from 'react'

const RenderOnViewportEntry = ({
    children,
    threshold = 0,
    minHeight = 240,
    root = null,
    rootMargin = "0px 0px 0px 0px",
    skeletonMargin,
    ...wrapperDivProps
}: any) => {
    const ref = useRef()
    const entered = useFirstViewportEntry(ref, { threshold, root, rootMargin })
    return (
        <div {...wrapperDivProps} ref={ref}  style={{
            minHeight: !entered ? minHeight : null,
        }}>
            {entered && <Suspense fallback={
                <Skeleton height={minHeight} style={{marginTop: skeletonMargin && skeletonMargin}}/>
            }>{children}</Suspense>}
        </div>
    )
}

export default RenderOnViewportEntry