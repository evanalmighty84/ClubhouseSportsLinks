import {useContext, createContext, useState, useEffect, useRef} from "react";

// @ts-ignore
export const MeetingAppContext = createContext();

export const useMeetingAppContext = () => useContext(MeetingAppContext);

// @ts-ignore
export const MeetingAppProvider = ({children}) => {
    const [selectedMic, setSelectedMic] = useState({id: null, label: null});
    const [selectedWebcam, setSelectedWebcam] = useState({id: null, label: null});
    const [selectedSpeaker, setSelectedSpeaker] = useState({id: null, label: null});
    const [isCameraPermissionAllowed, setIsCameraPermissionAllowed] = useState(null);
    const [isMicrophonePermissionAllowed, setIsMicrophonePermissionAllowed] = useState(null);
    const [raisedHandsParticipants, setRaisedHandsParticipants] = useState([]);
    const [sideBarMode, setSideBarMode] = useState(null);
    const [pipMode, setPipMode] = useState(false);

    const useRaisedHandParticipants = () => {
        const raisedHandsParticipantsRef = useRef();
// @ts-ignore
        const participantRaisedHand = (participantId) => {
            // @ts-ignore
            const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];

            const newItem = {participantId, raisedHandOn: new Date().getTime()};

            const participantFound = raisedHandsParticipants.findIndex(
                ({participantId: pID}) => pID === participantId
            );

            if (participantFound === -1) {
                raisedHandsParticipants.push(newItem);
            } else {
                raisedHandsParticipants[participantFound] = newItem;
            }
// @ts-ignore
            setRaisedHandsParticipants(raisedHandsParticipants);
        };

        useEffect(() => {
            // @ts-ignore
            raisedHandsParticipantsRef.current = raisedHandsParticipants;
        }, [raisedHandsParticipants]);

        const _handleRemoveOld = () => {
            // @ts-ignore
            const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];

            const now = new Date().getTime();

            const persisted = raisedHandsParticipants.filter(({raisedHandOn}) => {
                // @ts-ignore
                return parseInt(raisedHandOn) + 15000 > parseInt(now);
            });

            if (raisedHandsParticipants.length !== persisted.length) {
                // @ts-ignore
                setRaisedHandsParticipants(persisted);
            }
        };

        useEffect(() => {
            const interval = setInterval(_handleRemoveOld, 1000);

            return () => {
                clearInterval(interval);
            };
        }, []);

        return {participantRaisedHand};
    };

    return (
        <MeetingAppContext.Provider
            value={{
                // states

                raisedHandsParticipants,
                selectedMic,
                selectedWebcam,
                selectedSpeaker,
                sideBarMode,
                pipMode,
                isCameraPermissionAllowed,
                isMicrophonePermissionAllowed,

                // setters

                setRaisedHandsParticipants,
                setSelectedMic,
                setSelectedWebcam,
                setSelectedSpeaker,
                setSideBarMode,
                setPipMode,
                useRaisedHandParticipants,
                setIsCameraPermissionAllowed,
                setIsMicrophonePermissionAllowed,
            }}
        >
            {children}
        </MeetingAppContext.Provider>
    );
};