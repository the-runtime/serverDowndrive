package handlers

import (
	"net/http"
	"serverFordownDrive/config"
	"serverFordownDrive/workers"
)

func New() http.Handler {
	mux := http.NewServeMux()

	// start workers with dispatcher

	dispatch := workers.NewDispatcher(config.GetNumWorkers())
	dispatch.Run()
	workers.InitJobQueue()

	//mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	//	http.Redirect(w, r, "/index.html", http.StatusPermanentRedirect)
	//})
	mux.Handle("/api", http.FileServer(http.Dir("template")))

	mux.HandleFunc("/api/auth/google/login", oauthGoogleLogin)
	mux.HandleFunc("/api/auth/google/callback", oauthGoogleCallback)
	mux.HandleFunc("/api/process/", startGdrive)
	mux.HandleFunc("/api/progress", progressBar)
	mux.HandleFunc("/api/frontauth/", frontAuth)
	mux.HandleFunc("/api/account/register", registerUser)
	mux.HandleFunc("/api/account/getuser", getUser)
	mux.HandleFunc("/api/account/reset", resetLimit)
	mux.HandleFunc("/api/account/table", getTable)

	return mux
}
