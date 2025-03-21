#!/bin/bash

# Запуск приложения
for i in {1..13}
do
  node app
done

# Ожидание нажатия любой клавиши для продолжения
read -p "Press any key to continue..."
