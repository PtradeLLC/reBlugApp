// IntegrationsCatalog.tsx
import useParagonGlobal from "../pages/useParagonGlobal";
import useParagonAuth from "../pages/api/useParagonAuth"

function IntegrationsCatalog() {
    // paragon is the SDK singleton or `undefined`
    const paragon = useParagonGlobal();
    const { user } = useParagonAuth(paragon);

    return (<div className="catalog">
        <h1>Integrations Catalog</h1>
        {paragon &&
            paragon.getIntegrationMetadata().map((integration) => {
                const integrationEnabled = user?.integrations?.[integration.type]?.enabled;
                return <div
                    key={integration.type}
                    onClick={() => paragon.connect(integration.type)}
                >
                    <img src={integration.icon} width={20} height={20} />
                    <p>{integration.name}</p>
                    <p>{integrationEnabled ? "Connected" : "Not connected"}</p>
                </div>;
            })}
    </div>);
}

export default IntegrationsCatalog;