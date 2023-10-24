import { HostEvent } from '@thoughtspot/visual-embed-sdk';
import { LiveboardEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';

const ChartComponent = () => {
    const embedRef = useEmbedRef();
    const onLiveboardRendered = () => {
        embedRef.current.trigger(HostEvent.SetVisibleVizs, ['viz1', 'viz2']);
    };

    return (
        <LiveboardEmbed
            ref={embedRef}
            liveboardId="<liveboard-guid>"
            onLiveboardRendered={onLiveboardRendered}
        />
    );
};

export default ChartComponent;