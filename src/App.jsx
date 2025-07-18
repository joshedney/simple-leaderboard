import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Google Blue
    },
    secondary: {
      main: "#dc004e", // Google Pink
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      marginBottom: 24,
    },
  },
});

export default function LeaderboardApp() {
  const [contestants, setContestants] = useState([]);
  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  const [scoreInput, setScoreInput] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    const saved = localStorage.getItem("leaderboard_contestants");
    if (saved) setContestants(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("leaderboard_contestants", JSON.stringify(contestants));
  }, [contestants]);

  const addContestant = () => {
    if (name.trim()) {
      setContestants([
        ...contestants,
        { id: Date.now(), name, faction, score: 0, active: true },
      ]);
      setName("");
      setFaction("");
    }
  };

  const updateScore = (id, score) => {
    setContestants(
      contestants.map((c) =>
        c.id === id ? { ...c, score: c.score + Number(score) } : c
      )
    );
  };

  const knockOut = (id) => {
    setContestants(
      contestants.map((c) => (c.id === id ? { ...c, active: false } : c))
    );
  };

  const handleLogin = () => {
    if (adminPass === ADMIN_PASSWORD) setIsAdmin(true);
    else alert("Incorrect password");
  };

  const sortedContestants = [...contestants].sort((a, b) => b.score - a.score);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          🏆 Leaderboard
        </Typography>

        {!isAdmin ? (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Admin Login
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  type="password"
                  label="Enter admin password"
                  variant="outlined"
                  fullWidth
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                />
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Admin Area
              </Typography>
              <Stack direction="row" spacing={2} mb={2}>
                <TextField
                  label="Contestant Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Faction"
                  variant="outlined"
                  value={faction}
                  onChange={(e) => setFaction(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" color="secondary" onClick={addContestant}>
                  Add
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Leaderboard
            </Typography>

            {sortedContestants.map((contestant) => (
              <Box
                key={contestant.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  mb: 1,
                  borderRadius: 1,
                  bgcolor: contestant.active ? "background.paper" : "grey.300",
                  textDecoration: contestant.active ? "none" : "line-through",
                }}
              >
                <Box>
                  {contestant.name} ({contestant.faction || "No Faction"}) -{" "}
                  {contestant.score} pts
                </Box>
                {contestant.active && isAdmin && (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      type="number"
                      label="Score"
                      variant="outlined"
                      size="small"
                      sx={{ width: 100 }}
                      value={scoreInput[contestant.id] || ""}
                      onChange={(e) =>
                        setScoreInput({ ...scoreInput, [contestant.id]: e.target.value })
                      }
                    />
                    <Button
                      variant="outlined"
                      onClick={() => {
                        updateScore(contestant.id, scoreInput[contestant.id]);
                        setScoreInput({ ...scoreInput, [contestant.id]: "" });
                      }}
                    >
                      Add Score
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => knockOut(contestant.id)}
                    >
                      Knock Out
                    </Button>
                  </Stack>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
