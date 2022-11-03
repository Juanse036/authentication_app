import { useEffect, useState } from 'react'

export default () => {

  localStorage.setItem("user-theme", 'light');
  const [theme, setTheme] = useState(localStorage.getItem('user-theme'))

  const toggleTheme = () => {
    if (theme === 'dark') {
        localStorage.setItem("user-theme", 'light');
        setTheme(localStorage.getItem('user-theme'))      
    } else {
        localStorage.setItem("user-theme", 'dark');      
        setTheme(localStorage.getItem('user-theme'))        
    }
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme)
    }
  }, [])

  return {
    theme,
    toggleTheme,
  }
}