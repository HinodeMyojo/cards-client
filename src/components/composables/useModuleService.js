import { ref } from "vue"; // Импортируем ref из Vue для создания реактивных переменных
import { moduleService } from '@/services/moduleService'; // Импортируем сервис для взаимодействия с API модулей

// Функция useModuleService предоставляет методы и состояния для работы с модулями
export function useModuleService() {
    // Реактивные переменные для хранения состояния
    const currentModule = ref(null); // Хранит данные текущего модуля
    const modules = ref([]); // Хранит список всех модулей
    const loading = ref(false); // Указывает, находится ли компонент в процессе загрузки данных
    const error = ref(null); // Хранит информацию об ошибках
    const headers = ref([]); // для хранения инфы о заголовках таблицы

    // Асинхронная функция для получения списка модулей
    const getModules = async () => {
        loading.value = true; // Устанавливаем статус загрузки в true
        error.value = null; // Сбрасываем ошибки перед запросом

        try {
            // Выполняем запрос к API для получения всех модулей
            const response = await moduleService.getModules(); 
            modules.value = response.data; // Заполняем реактивный массив модулей полученными данными
        } catch (err) {
            // Если произошла ошибка, сохраняем её сообщение
            error.value = err.message || 'Ошибка при загрузке модулей'; // Обработка ошибки
        } finally {
            loading.value = false; // Сбрасываем статус загрузки в false после завершения запроса
        }
    };

    const getHeaders = async() => {
        try {
            const response = await moduleService.getHeaders();
            headers.value = response.data;
        } catch (err) {
            error.value = err.message || 'Ошибка при загрузке настоек таблицы';
        }
    }

    // Асинхронная функция для получения модуля по его ID
    const getModuleById = async (moduleId) => {
        loading.value = true; // Устанавливаем статус загрузки в true
        error.value = null; // Сбрасываем ошибки перед запросом

        try {
            // Выполняем запрос к API для получения модуля по ID
            const response = await moduleService.getModuleById(moduleId);
            currentModule.value = response.data; // Заполняем реактивную переменную текущего модуля полученными данными
        } catch (err) {
            // Если произошла ошибка, сохраняем её сообщение
            error.value = err.message || 'Ошибка при загрузке модуля'; // Обработка ошибки
        } finally {
            loading.value = false; // Сбрасываем статус загрузки в false после завершения запроса
        }
    };

    const createModule = async (data) => {
        loading.value = true; // Устанавливаем статус загрузки в true
        error.value = null; // Сбрасываем ошибки перед запросом

        try {
            // Выполняем запрос к API для получения модуля по ID
            await moduleService.createModule(data);
        } catch (err) {
            // Если произошла ошибка, сохраняем её сообщение
            error.value = err.message || 'Ошибка при загрузке модуля'; // Обработка ошибки
        } finally {
            loading.value = false; // Сбрасываем статус загрузки в false после завершения запроса
        }
    };

    // Возвращаем все реактивные переменные и функции для использования в компоненте
    return {
        modules, // Список модулей
        currentModule, // Текущий модуль
        loading, // Статус загрузки
        error, // Информация об ошибках
        getModules, // Функция для получения всех модулей
        getModuleById, // Функция для получения модуля по ID
        createModule, // Место для функции создания модуля
        // updateModule, // Место для функции обновления модуля
        headers,
        getHeaders,
        
    };
}
