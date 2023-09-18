export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <h1 className="header-nav__brand">React Events</h1>
        <ul className="header-nav__list">
          <li className="header-nav__listitem">
            <button type="button">New Event</button>
          </li>
        </ul>
      </nav>
      <section className="header-desc">
        <h2>
          Connect with amazing people or <span>find a new passion</span>
        </h2>
        <p>Anyone can organize and join events on React Events!</p>
        <button type="button">Create your first event</button>
      </section>
    </header>
  );
}
