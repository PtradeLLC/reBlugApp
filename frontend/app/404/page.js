export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg text-muted-foreground">
                    The page you're looking for does not exist.
                </p>
            </div>
        </div>
    );
}