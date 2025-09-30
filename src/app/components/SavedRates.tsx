import * as MaterialUI from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface SavedRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: number;
}

interface SavedRatesProps {
  savedRates: SavedRate[];
  onDelete: (id: string) => void;
  onSelect: (fromCurrency: string, toCurrency: string) => void;
}

export default function SavedRates({
  savedRates,
  onDelete,
  onSelect,
}: SavedRatesProps) {
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (savedRates.length === 0) {
    return (
      <MaterialUI.Box
        sx={{
          width: "100%",
          padding: "2rem",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        <BookmarkIcon sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
        <MaterialUI.Typography variant="body2">
          No saved rates yet. Save your favorite conversions!
        </MaterialUI.Typography>
      </MaterialUI.Box>
    );
  }

  return (
    <MaterialUI.Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {savedRates.map((rate) => (
        <MaterialUI.Card
          key={rate.id}
          sx={{
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            transition: "all 0.2s ease",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transform: "translateY(-2px)",
              borderColor: "#2563eb",
            },
          }}
          onClick={() => onSelect(rate.fromCurrency, rate.toCurrency)}
        >
          <MaterialUI.Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MaterialUI.Box sx={{ flex: 1 }}>
              <MaterialUI.Typography
                variant="h6"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  mb: 0.5,
                }}
              >
                {rate.fromCurrency} → {rate.toCurrency}
              </MaterialUI.Typography>
              <MaterialUI.Typography
                variant="body2"
                sx={{
                  color: "#2563eb",
                  fontWeight: 500,
                  mb: 0.5,
                }}
              >
                Rate: {rate.rate.toFixed(4)}
              </MaterialUI.Typography>
              <MaterialUI.Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  fontSize: "0.75rem",
                }}
              >
                Saved: {formatDate(rate.timestamp)}
              </MaterialUI.Typography>
            </MaterialUI.Box>
            <MaterialUI.IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDelete(rate.id);
              }}
              sx={{
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "#fee2e2",
                },
              }}
              aria-label="Delete saved rate"
            >
              <DeleteIcon />
            </MaterialUI.IconButton>
          </MaterialUI.Box>
        </MaterialUI.Card>
      ))}
    </MaterialUI.Box>
  );
}