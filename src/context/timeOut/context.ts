import React from "react";

interface TimeOutContextType {
    setTimout: (time: number) => void;
    chekTimout: (timeNow: number) => boolean;
}

export const TimeOutContext = React.createContext<TimeOutContextType>({
    setTimout: () => {},
    chekTimout: () => false,
});