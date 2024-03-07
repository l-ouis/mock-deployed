import { Dispatch, SetStateAction } from 'react';


/**
 * Interface defining the props required by the LoginButton component.
 */
interface loginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * Function component representing a login/logout button.
 * @param props - Props object containing isLoggedIn and setIsLoggedIn.
 * @returns A button component for login/logout functionality.
 */
export function LoginButton(props: loginProps) {

  /**
   * Function to handle authentication. It toggles the login status and updates the state accordingly.
   * @returns The new login status after toggling.
   */
  const authenticate = () => {
    const newValue = !props.isLoggedIn;
    props.setIsLoggedIn(newValue);
    return newValue;
  }

  // Conditionally rendering the button based on the login status.
  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    );
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    );
  }
}