cmake_minimum_required(VERSION 3.22.1)
project(chatroom-api VERSION 0.1.0 LANGUAGES C CXX)

include(CTest)
enable_testing()

# This lets me use neovim for c++ editing
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Directories with header files (.h, .hpp)
include_directories(${PROJECT_SOURCE_DIR}/include)

# Executable target followed by .cpp source files
add_executable(chatroom-api src/main.cpp)

#add_executable(fakeks-api-srv-test test.cpp)
#target_link_libraries(fakeks-api-srv-test -lpqxx)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)

