import React, { Component, MouseEvent, ReactNode } from "react";

interface MarqueeProps {
    freq?: number;
    offset?: number;
    children?: ReactNode;
}

interface MarqueeState {
    left: number;
    isDragging: boolean;
}

class Marquee extends Component<MarqueeProps, MarqueeState> {
    private dragSpan = React.createRef<HTMLSpanElement>();
    private scrollTimer: NodeJS.Timeout | null = null;
    private spanWidth: number = 0;
    private prePageX: number = 0;
    private currentPageX: number = 0;

    constructor(props: MarqueeProps) {
        super(props);
        this.state = {
            left: 0,
            isDragging: false,
        };
    }

    componentDidMount() {
        this.initMarquee();
    }

    componentWillUnmount() {
        if (this.scrollTimer) clearInterval(this.scrollTimer);
    }

    initMarquee() {
        const { freq = 20 } = this.props;
        let spanWidth = this.dragSpan.current?.getBoundingClientRect().width || 0;
        // // Get the element by its ID
        const element = document.getElementById('mark-id');
        if (element) {
            // Get the width of the element
            spanWidth = element.scrollWidth;
        }
        const windowWidth = window.innerWidth;
        this.spanWidth = Math.min(spanWidth, windowWidth);
        this.scrollTimer = setInterval(this.move, freq);
    }

    move = () => {
        const { offset = 1 } = this.props;
        let left = this.state.left - offset;
        // console.log(offset, left, this.spanWidth * 2.4)

        if (left < -this.spanWidth * 2.4) {
            left = 0;
        }
        this.setState({ left });
        // console.log(this.state.left)
    };

    handleMouseEnter = () => {
        if (this.scrollTimer) clearInterval(this.scrollTimer);
    };

    handMouseLeave = () => {
        const { freq = 15 } = this.props;
        if (this.scrollTimer) clearInterval(this.scrollTimer);
        this.scrollTimer = setInterval(this.move, freq);
        this.setState({ isDragging: false });
    };

    handleDrag = (e: MouseEvent<HTMLDivElement>) => {
        this.prePageX = this.currentPageX;
        this.currentPageX = e.pageX;
        const left = this.state.left + (this.currentPageX - this.prePageX);
        this.setState({ left });
    };

    handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        this.setState({ isDragging: true });
        this.prePageX = e.pageX;
        this.currentPageX = this.prePageX;
    };

    handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        this.setState({ isDragging: false });
    };

    render() {
        const { children } = this.props;
        const handleDrag = this.state.isDragging ? this.handleDrag : undefined;
        return (
            <div
                className="marquee-container"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handMouseLeave}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={handleDrag}
            >
                <div className="drag-span" style={{ left: this.state.left }}>
                    {/* Print children twice to avoid space */}
                    <span ref={this.dragSpan}>
                        {children}
                        {/* {children} Second copy */}
                    </span>
                </div>
            </div>
        );
    }
}

export default Marquee;
