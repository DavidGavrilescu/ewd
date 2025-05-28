import React, { useState, useEffect } from "react";
import { BackendBaseURL } from "./Postari";

interface Review {
  id: number;
  nume: string;
  rating: number;
  comentariu: string;
  data_creare: string;
  session_id: string;
}

interface ReviewFormData {
  nume: string;
  rating: number;
  comentariu: string;
}

interface ReviewStats {
  total: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    nume: "",
    rating: 5,
    comentariu: "",
  });
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [userSessionId, setUserSessionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // genereaza sau recupereaza session ID din localStorage
  useEffect(() => {
    let sessionId = localStorage.getItem("userSessionId");
    if (!sessionId) {
      sessionId = "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
      localStorage.setItem("userSessionId", sessionId);
    }
    setUserSessionId(sessionId);
  }, []);

  // incarca review-urile
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BackendBaseURL}api/reviews/`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Eroare la incarcarea review-urilor:", error);
    }
  };

  const calculateStats = (): ReviewStats => {
    if (reviews.length === 0) {
      return { total: 0, averageRating: 0, ratingDistribution: {} };
    }

    const total = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / total;
    const ratingDistribution = reviews.reduce(
      (dist, review) => {
        dist[review.rating] = (dist[review.rating] || 0) + 1;
        return dist;
      },
      {} as { [key: number]: number }
    );

    return { total, averageRating, ratingDistribution };
  };

  const stats = calculateStats();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingReview ? `${BackendBaseURL}api/reviews/${editingReview.id}/` : `${BackendBaseURL}api/reviews/`;

      const method = editingReview ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          session_id: userSessionId,
        }),
      });

      if (response.ok) {
        await fetchReviews();
        setFormData({ nume: "", rating: 5, comentariu: "" });
        setShowForm(false);
        setEditingReview(null);
      } else {
        const errorData = await response.json();
        alert(errorData.eroare || "Eroare la salvarea review-ului");
      }
    } catch (error) {
      console.error("Eroare:", error);
      alert("Eroare de conexiune. Va rugam sa incercati din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (review: Review) => {
    if (review.session_id === userSessionId) {
      setEditingReview(review);
      setFormData({
        nume: review.nume,
        rating: review.rating,
        comentariu: review.comentariu,
      });
      setShowForm(true);
    }
  };

  const handleDelete = async (reviewId: number) => {
    if (window.confirm("Sunteti sigur ca doriti sa stergeti acest review?")) {
      try {
        const response = await fetch(`${BackendBaseURL}api/reviews/${reviewId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: userSessionId,
          }),
        });

        if (response.ok) {
          await fetchReviews();
        } else {
          console.error("Eroare la stergerea review-ului");
        }
      } catch (error) {
        console.error("Eroare:", error);
      }
    }
  };

  const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""} ${interactive ? "interactive" : ""}`}
            onClick={interactive && onChange ? () => onChange(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const canEditReview = (review: Review) => {
    return review.session_id === userSessionId;
  };

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>Review-uri de la vizitatori</h3>
        <button className="btn-add-review" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Anuleaza" : "Adauga Review"}
        </button>
      </div>

      {/* Statistics Section */}
      {reviews.length > 0 && (
        <div className="reviews-stats">
          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Review-uri</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.averageRating.toFixed(1)}</span>
              <span className="stat-label">Rating mediu</span>
              <div className="average-stars">{renderStars(Math.round(stats.averageRating))}</div>
            </div>
          </div>
          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="rating-bar">
                <span className="rating-label">{rating} ★</span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${stats.total > 0 ? ((stats.ratingDistribution[rating] || 0) / stats.total) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="rating-count">{stats.ratingDistribution[rating] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="review-form-container">
          <form onSubmit={handleSubmit} className="review-form">
            <h4>{editingReview ? "Editeaza Review" : "Adauga un Review"}</h4>

            <div className="form-group">
              <label htmlFor="nume">Nume:</label>
              <input
                type="text"
                id="nume"
                value={formData.nume}
                onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
                required
                maxLength={100}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Rating:</label>
              {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
            </div>

            <div className="form-group">
              <label htmlFor="comentariu">Comentariu:</label>
              <textarea
                id="comentariu"
                value={formData.comentariu}
                onChange={(e) => setFormData({ ...formData, comentariu: e.target.value })}
                required
                rows={4}
                maxLength={1000}
                disabled={isLoading}
                placeholder="Spune-ne despre experienta ta..."
              />
              <small className="char-count">{formData.comentariu.length}/1000 caractere</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Se salveaza..." : editingReview ? "Actualizeaza" : "Trimite Review"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setShowForm(false);
                  setEditingReview(null);
                  setFormData({ nume: "", rating: 5, comentariu: "" });
                }}
                disabled={isLoading}
              >
                Anuleaza
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="review-author">
                  <strong>{review.nume}</strong>
                  {renderStars(review.rating)}
                </div>
                <div className="review-date">
                  {new Date(review.data_creare).toLocaleDateString("ro-RO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <div className="review-content">
                <p>{review.comentariu}</p>
              </div>

              {canEditReview(review) && (
                <div className="review-actions">
                  <button className="btn-edit" onClick={() => handleEdit(review)} disabled={isLoading}>
                    Editeaza
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(review.id)} disabled={isLoading}>
                    Sterge
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-reviews">
            <div className="no-reviews-icon">📝</div>
            <h4>Nu exista review-uri inca</h4>
            <p>Fii primul care lasa un review si ajuta-ne sa imbunatatim experienta!</p>
            <button className="btn-first-review" onClick={() => setShowForm(true)}>
              Lasa primul review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
