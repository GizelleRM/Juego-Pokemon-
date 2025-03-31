from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

def test_interfaz_prueba():
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)

    try:
        driver.get("http://localhost:8000/nivel5/")  # URL donde está tu vista

        # Esperar a que cargue la página y simular clic en la instructora
        instructora = driver.find_element(By.ID, "instructora")
        instructora.click()

        # Esperar a que se muestre la prueba, luego navegar con los botones
        driver.find_element(By.XPATH, '//button[contains(text(), "Siguiente")]').click()
        driver.find_element(By.XPATH, '//button[contains(text(), "ir a la prueba")]').click()

        # Seleccionar opciones correctas (como ejemplo)
        driver.find_elements(By.NAME, "p1")[1].click()  # ">"
        driver.find_elements(By.NAME, "p2")[1].click()  # "and"
        driver.find_elements(By.NAME, "p3")[1].click()  # "!="
        driver.find_elements(By.NAME, "p4")[1].click()  # "or"
        driver.find_elements(By.NAME, "p5")[1].click()  # "!="
        driver.find_elements(By.NAME, "p6")[0].click()  # "and"
        driver.find_elements(By.NAME, "p7")[0].click()  # "<="

        # Clic en "Revisar"
        driver.find_element(By.XPATH, '//button[contains(text(), "Revisar")]').click()

        resultado = driver.find_element(By.ID, "resultado-prueba").text
        assert "Puntaje: 7/7" in resultado or "¡Perfecto" in resultado
    finally:
        driver.quit()
