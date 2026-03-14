export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-light">Yükleniyor...</p>
      </div>
    </div>
  );
}
