<script>
  import { base } from '$app/paths';
</script>

<div class="header-container">
    <!-- Left half with Logo and Headline -->
    <div class="header-half logo-side">
      <div class="content-wrapper">
        <a href="{base}/" rel="noopener noreferrer">
          <img src="{base}/images/ds_logo.svg" alt="The Daily Star Logo" class="logo-image" />
        </a>
        
        <div class="embellishment">
          <hr class="separator-line" />
        </div>

        <h1 class="article-headline">
          <span class="line-1">POLICE</span>
          <span class="line-2">STORY</span>
        </h1>

        <div class="byline">
          <p>Reporting and Analysis: <strong></strong></p>
          <p>Data Visualisation and Design: <strong></strong></p>
          <p>Additional Reporting: <strong></strong></p>
        </div>

      </div>
    </div>
  
    <!-- Right half with Image -->
    <div class="header-half image-side">
      <img src="{base}/images/header.jpg" alt="An illustration of an eye made of circuitry." class="header-image" />
    </div>
</div>
  
<style>
/* --- BASE DESKTOP STYLES (for large screens) --- */
.header-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.header-half {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-side {
  background-color: white;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
}

.logo-image {
  width: 200px;
  height: auto;
}

.embellishment {
  margin: 2rem 0;
  width: 100%;
  text-align: center;
}

.separator-line {
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  width: 60px;
  margin: 0 auto;
}

.image-side {
  background-color: #f0f0f0;
}

.header-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-headline {
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 700;
  color: #111;
  line-height: 1.1;
  margin: 0;
  width: 100%;
}

.article-headline span {
  display: block;
}

.line-1 {
  font-size: 5rem; /* Fixed size for desktop */
  color: #c00007;
  margin-bottom: 0.05em;
  letter-spacing: -0.01em; /* Reduced to prevent tilt */
}

.line-2 {
  font-size: 5rem; /* Fixed size for desktop */
  letter-spacing: -0.01em; /* Reduced to prevent tilt */
}

.byline {
  margin-top: 184px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #666;
  line-height: 1.6;
}

.byline p {
  margin: 0;
}

.byline strong {
  font-weight: 600;
  color: #333;
}

/* --- MOBILE STYLES --- */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }

  .header-half {
    flex: none;
    width: 100%;
  }

  .image-side {
    order: -1;
    height: 50vh;
  }

  .header-image {
    object-fit: cover;
  }

  .content-wrapper {
    padding: 3rem 1.5rem;
    padding-top: 1.5rem;
  }

  .logo-image {
    width: 150px;
  }

  .line-1,
  .line-2 {
    font-size: 8vw; /* Responsive on mobile */
    letter-spacing: 0.02em; /* Slightly looser for readability */
  }

  .byline {
    margin-top: 40px;
  }
}
</style>