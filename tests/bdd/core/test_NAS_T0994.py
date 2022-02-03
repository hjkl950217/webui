# coding=utf-8
"""Core UI feature tests."""

import time
from function import (
    wait_on_element,
    is_element_present,
    wait_on_element_disappear,
    ssh_cmd
)
from pytest_bdd import (
    given,
    scenario,
    then,
    when,
)


@scenario('features/NAS-T994.feature', 'Change the password of a user')
def test_change_the_password_of_a_user(driver):
    """Change the password of a user."""


@given('the browser is open, the FreeNAS URL and logged in')
def the_browser_is_open_the_freenas_url_and_logged_in(driver, nas_ip, root_password):
    """the browser is open, the FreeNAS URL and logged in."""
    if nas_ip not in driver.current_url:
        driver.get(f"http://{nas_ip}")
        assert wait_on_element(driver, 10, '//input[@placeholder="Username"]')
        time.sleep(1)
    if not is_element_present(driver, '//mat-list-item[@ix-auto="option__Dashboard"]'):
        assert wait_on_element(driver, 10, '//input[@placeholder="Username"]')
        driver.find_element_by_xpath('//input[@placeholder="Username"]').clear()
        driver.find_element_by_xpath('//input[@placeholder="Username"]').send_keys('root')
        driver.find_element_by_xpath('//input[@placeholder="Password"]').clear()
        driver.find_element_by_xpath('//input[@placeholder="Password"]').send_keys(root_password)
        assert wait_on_element(driver, 4, '//button[@name="signin_button"]')
        driver.find_element_by_xpath('//button[@name="signin_button"]').click()
    if not is_element_present(driver, '//li[contains(.,"Dashboard")]'):
        assert wait_on_element(driver, 10, '//span[contains(.,"root")]')
        element = driver.find_element_by_xpath('//span[contains(.,"root")]')
        driver.execute_script("arguments[0].scrollIntoView();", element)
        time.sleep(0.5)
        assert wait_on_element(driver, 7, '//mat-list-item[@ix-auto="option__Dashboard"]', 'clickable')
        driver.find_element_by_xpath('//mat-list-item[@ix-auto="option__Dashboard"]').click()


@when('you should be on the dashboard')
def you_should_be_on_the_dashboard(driver):
    """you should be on the dashboard."""
    assert wait_on_element(driver, 10, '//li[contains(.,"Dashboard")]')
    assert wait_on_element(driver, 10, '//span[contains(.,"System Information")]')


@then('click on the Accounts on the side menu, click on Users')
def click_on_the_accounts_on_the_side_menu_click_on_users(driver):
    """click on the Accounts on the side menu, click on Users."""
    assert wait_on_element(driver, 7, '//mat-list-item[@ix-auto="option__Accounts"]', 'clickable')
    driver.find_element_by_xpath('//mat-list-item[@ix-auto="option__Accounts"]').click()
    assert wait_on_element(driver, 7, '//mat-list-item[@ix-auto="option__Users"]', 'clickable')
    driver.find_element_by_xpath('//mat-list-item[@ix-auto="option__Users"]').click()


@then('the Users page should open')
def the_users_page_should_open(driver):
    """the Users page should open."""
    assert wait_on_element(driver, 7, '//div[contains(.,"Users")]')


@then('click the Greater-Than-Sign right of the users')
def click_the_greaterthansign_right_of_the_users(driver):
    """click the Greater-Than-Sign right of the users."""
    assert wait_on_element(driver, 7, '//a[@ix-auto="expander__ericbsd"]', 'clickable')
    driver.find_element_by_xpath('//a[@ix-auto="expander__ericbsd"]').click()


@then('the User Field should expand down, then click the Edit button')
def the_user_field_should_expand_down_then_click_the_edit_button(driver):
    """the User Field should expand down, then click the Edit button."""
    assert wait_on_element(driver, 7, '//button[@ix-auto="button__EDIT_ericbsd"]')
    driver.find_element_by_xpath('//button[@ix-auto="button__EDIT_ericbsd"]').click()


@then('the User Edit Page should open')
def the_user_edit_page_should_open(driver):
    """the User Edit Page should open."""
    assert wait_on_element(driver, 7, '//h4[contains(.,"Identification")]')


@then('change the password in both fields and click save')
def change_the_password_in_both_fields_and_click_save(driver):
    """change the password in both fields and click save."""
    assert wait_on_element(driver, 7, '//input[@ix-auto="input__Password"]')
    driver.find_element_by_xpath('//input[@ix-auto="input__Password"]').send_keys('testing1234')
    driver.find_element_by_xpath('//input[@ix-auto="input__Confirm Password"]').clear()
    driver.find_element_by_xpath('//input[@ix-auto="input__Confirm Password"]').send_keys('testing1234')
    assert wait_on_element(driver, 7, '//button[@ix-auto="button__SAVE"]', 'clickable')
    driver.find_element_by_xpath('//button[@ix-auto="button__SAVE"]').click()


@then('changes should be saved without an error')
def changes_should_be_saved_without_an_error(driver):
    """changes should be saved without an error."""
    assert wait_on_element_disappear(driver, 15, '//h6[contains(.,"Please wait")]')
    assert wait_on_element(driver, 7, '//div[contains(.,"Users")]')


@then('try to ssh with the old password for that user')
def try_to_ssh_with_the_old_password_for_that_user(driver, nas_ip):
    """try to ssh with the old password for that user."""
    global ssh_result
    ssh_result = ssh_cmd('beadm list', 'ericbsd', 'testing', nas_ip)


@then('the user should not be able to log in ssh with the old password')
def the_user_should_not_be_able_to_log_in_ssh_with_the_old_password(driver):
    """the user should not be able to log in ssh with the old password."""
    assert not ssh_result['result'], ssh_result['output']
    assert 'default' not in ssh_result['output'], ssh_result['output']


@then('try to ssh with the new password for that user')
def try_to_ssh_with_the_new_password_for_that_user(driver, nas_ip):
    """try to ssh with the new password for that user."""
    global ssh_result
    ssh_result = ssh_cmd('beadm list', 'ericbsd', 'testing1234', nas_ip)


@then('the user should be able to log in with the new password')
def the_user_should_be_able_to_log_in_with_the_new_password(driver):
    """the user should be able to log in with the new password."""
    assert ssh_result['result'], ssh_result['output']
    assert 'default' in ssh_result['output'], ssh_result['output']
